const Question = require("../models/Question");
const Session = require("../models/Session");

// @desc add additional question to an existing session
// @route POST /api/questions/add
// @access Private
exports.addQuestionToSession = async (req, res) => {
    try {
        const { sessionId, questions} = req.body;

        if(!sessionId || !questions || !Array.isArray(questions)) {
            return res.status(400).json({
                message: "Invalid request"
            });
        }
        const session = await Session.findById(sessionId);

        if(!session) {
            return res.status(404).json({
                message: "Session not found"
            });
        }

        // note: Create new questions
        const createQuestions = await Question.insertMany(questions.map((q) => ({
            session: session._id,
            question: q.question,
            answer: q.answer,
        }))
    );

    // note: update session to include new question IDs
    session.questions.push(...createQuestions.map((q) => q._id));
    await session.save();

    res.status(201).json(createQuestions)


    } catch (error) {
        res.status(500).json({
            message: "Server error"
        });
    }
}

// @desc Pin or unpin a question
// @route POST /api/questions/:id/pin
// @access Private
exports.togglePinQuestion = async(req, res) => {
    try {
        const question = await Question.findById(req.params.id);

        if(!question) {
            return res
            .status(400)
            .json({
                success: false,
                message: "Question not found"
            })
        }

        question.pinned = !question.pinned;
        await question.save();
        res.status(200).json({
            success: true,
            question
        });

    } catch (error) {
        res.status(500).json({
            message: "Server error"
        });
    }
};

// @desc Update note for a question
// @route POST /api/questions/:id/note
// @access Private
exports.updateQuestionNote = async(req, res) => {
    try {
        const { note } = req.body;
        const question = await Question.findById(req.params.id);

        if(!question) {
            return res
            .status(400)
            .json({
                success: false,
                message: "Question not found"
            })
        }
        question.note = note || "";
        await question.save();
        res.status(200).json({
            success: true,
            question
        });
        console.log('req.body:', req.body);

    } catch (error) {
        res.status(500).json({
            message: "Server error"
        });
    }
};