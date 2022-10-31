import LandingLayout from "../../components/layout/LandingLayout";
import TableSelectMatch from "./TableSelectMatch";

const LangdingPage = () => {
  return (
    <LandingLayout>
      <div className="flex justify-center mb-10">
        <TableSelectMatch />
      </div>
    </LandingLayout>
  );
};

export default LangdingPage;
