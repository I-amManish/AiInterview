import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import moment from 'moment'
import { AnimatePresence, motion} from "framer-motion"
import { LuCircleAlert, LuListCollapse } from 'react-icons/lu'
import SpinnerLoader from '../../components/Loader/SpinnerLoader'
import { toast } from 'react-hot-toast';

const InterviewPrep = () => {

  const { sessionId } = useParams();

  const [sessionData, setSessionData] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  const [openLeanMoreDrawer, setOpenLeanMoreDrawer] = useState(false);
  const [explanation, setExplanation] = useState(null)

  const [isLoading, setIsLoading] = useState(false);
  const [isUpdateLoader, setisUpdateLoader] = useState(false);

  // fetch session data by session id
  const fetchSessionDetailsById = async () => {};

  // pin Question
  const toggleQuestionPinStatus = async (questionId) => {};

  // add more questions to a session
  const uploadMoreQuestions = async () => {};

  useEffect(() => {
    if(sessionId) {
      fetchSessionDetailsById();
    }
    return() => {};
  }, [])
 
  return (
    <div>

    </div>
  )
}

export default InterviewPrep