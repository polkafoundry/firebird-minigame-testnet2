import LandingLayout from "../../components/layout/LandingLayout";
import Questions from "./Questions";
import TableSelectMatch from "./TableSelectMatch";

const LangdingPage = () => {
  return (
    <LandingLayout>
      <div className="flex flex-col items-center mb-10 pt-20">
        {/* <TableSelectMatch /> */}
        <Questions />
      </div>
    </LandingLayout>
  );
};

export default LangdingPage;
