import LandingLayout from "../../components/layout/LandingLayout";
import MatchList from "./MatchList";
import Questions from "./Questions";
import TableSelectMatch from "./TableSelectMatch";

const LangdingPage = () => {
  return (
    <LandingLayout>
      <div className="flex flex-col items-center mb-10 pt-20">
        {/* <TableSelectMatch /> */}
        <MatchList />
        <Questions />
      </div>
    </LandingLayout>
  );
};

export default LangdingPage;
