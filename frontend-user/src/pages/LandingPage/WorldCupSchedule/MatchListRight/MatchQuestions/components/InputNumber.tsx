import clsx from "clsx";
import { QUESTION_STATUS, SCORE_PATTER } from "../../../../../../constants";

type InputNumberProps = {
  input: string;
  handleChange: (data: any) => void;
  className?: string;
  type: QUESTION_STATUS;
};
const InputNumber = (props: InputNumberProps) => {
  const { input, handleChange, className = "", type } = props;

  const onChange = (e: any) => {
    const valueInput = e.target.value;
    if (SCORE_PATTER.test(valueInput) || valueInput === "") {
      handleChange(valueInput);
    }
  };

  return (
    <input
      type="text"
      className={clsx(
        "w-14 h-10 p-2 text-3xl font-semibold text-center bg-white outline-none",
        type === QUESTION_STATUS.NOT_PREDICTED && "border",
        type === QUESTION_STATUS.CORRECT_ANSWER && "text-green-600",
        type === QUESTION_STATUS.WRONG_ANSWER && "text-red-600",

        className,
      )}
      disabled={type !== QUESTION_STATUS.NOT_PREDICTED}
      value={input}
      placeholder="0"
      onChange={onChange}
    />
  );
};

export default InputNumber;
