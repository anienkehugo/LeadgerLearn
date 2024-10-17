import { useGetQuizzesQuery } from "./quizApiSlice";
import Quiz from "./Quiz";
import useAuth from "../../hooks/useAuth";
import useTitle from "../../hooks/useTitle";
import PulseLoader from "react-spinners/PulseLoader";

const QuizList = () => {
  useTitle("Quiz App: Quizzes List");

  const { username, isManager, isAdmin } = useAuth();

  const {
    data: quizzes,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetQuizzesQuery("quizzesList", {
    pollingInterval: 15000,
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
  });

  let content;

  if (isLoading) content = <PulseLoader color={"#FFF"} />;

  if (isError) {
    content = <p className="errmsg">{error?.data?.message}</p>;
  }

  if (isSuccess) {
    const { ids, entities } = quizzes;

    let filteredIds;
    if (isManager || isAdmin) {
      filteredIds = [...ids];
    } else {
      filteredIds = ids.filter(
        (quizId) => entities[quizId].username === username
      );
    }

    const tableContent =
      filteredIds?.length &&
      filteredIds.map((quizId) => <Quiz key={quizId} quizId={quizId} />);

    content = (
      <table className="table table--quizzes">
        <thead className="table__thead">
          <tr>
            <th scope="col" className="table__th quiz__title">
              Title
            </th>
            <th scope="col" className="table__th quiz__owner">
              Owner
            </th>
            <th scope="col" className="table__th quiz__actions">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>{tableContent}</tbody>
      </table>
    );
  }

  return content;
};

export default QuizList;
