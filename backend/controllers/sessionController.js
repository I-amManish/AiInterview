const Session = require("../models/Session");
const Question = require("../models/Question");
const { removeListener } = require("../models/User");

// @desc create a new session and linked questions
// @route POST /api/sessions/create
// @access Private
exports.createSession = async(req,res) => {
    try {
        const { role, experience, topicsToFocus, description, questions } = req.body;
        const userId = req.user.id;

        const session = new Session({
            user: userId,
            role,
            experience,
            topicsToFocus,
            description,
            questions,
        });

        const questionDocs = await Promise.all(
            questions.map(async (q) => {
                const question = await Question.create({
                    session: session._id,
                    question: q.question,
                    answer: q.answer,
                })
            })
        );

        session.questions = questionDocs;
        await session.save();

        res.status(201).json({
            success: true,
            session,
        });

    } catch (error) {
        res.status.json({
            success: false,
            error: "Server Error",
        })
    }
};

// @desc get all sessions for the logged-in user
// @route GET /api/sessions/my-sessions
// @access Private
exports.getMySessions = async(req, res) => {
     try {
        const sessions = await Session.find({
            user: req.user.id,
        })
        .sort({ createdAt: -1 })
        .populate("questions");
        res.status(200).json(sessions);
    } catch (error) {
        res.status.json({
            success: false,
            error: "Server Error",
        })
    }
};

// @desc get a session by ID with populated questions
// @route GET /api/sessions/:id
// @access Private
exports.getSessionById = async(req, res) => {
     try {
        const session = await Session.findById(req.params.id)
        .populate({
            path: "questions",
            options: { sort: { isPinned: -1, createdAt: -1 } },
        })
        .exec();

        if(!session) {
            return res.status(404).json({
                success: false,
                error: "Session not found",
            });
        }

        res.status(200).json({
            success: true,
            session
        });

    } catch (error) {
        res.status.json({
            success: false,
            error: "Server Error",
        })
    }
};

// @desc delete a session by ID
// @route DELETE /api/sessions/:id
// @access Private
exports.deleteSession = async(req, res) => {
     try {
        const session = await Session.findById(req.params.id);

        if(!session) {
            return res.status(404).json({
                success: false,
                error: "Session not found",
            });

        }
        // note: check if the logged-in user owns this session
        if (session.user.toString() !== req.user.id) {
            return res.status(401).json({
                message: "Not authorized to delete this session",
            });
        }

        // note: first, delete all questions linked to this session
        await Question.deleteMany({ session: session._id});

        // note: then, delete the session itself
        await session.deleteOne();

        res.status(200).json({
            message: "Session deleted successfully",
        })
    } catch (error) {
        res.status.json({
            success: false,
            error: "Server Error",
        })
    }
};