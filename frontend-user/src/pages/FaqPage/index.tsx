import { Disclosure, Transition } from "@headlessui/react";
import clsx from "clsx";
import LandingLayout from "../../components/layout/LandingLayout";
import HeadingPrimary from "../LandingPage/components/HeadingPrimary";

type FaqTypes = {
  id: number;
  question: string;
  answer: string;
};

const faqs: Array<FaqTypes> = [
  {
    id: 1,
    question: "What is Phoenix Cup?",
    answer: `Phoenix Cup is an event in the Beta Testnet phase 2 event series of Firebird. Along with the exciting atmosphere of the 2022 World Cup, Phoenix Cup gives users an interesting experience when participating in activities to predict the match score and bring back great rewards.`,
  },
  {
    id: 2,
    question: "How much does it cost to participate in the Phoenix Cup?",
    answer: `NO PAYMENT NEEDED. There is absolutely no need for any fees to participate in the Phoenix Cup, users will be given a certain number of Testnet tokens to participate. 
Note: Testnet tokens are only accepted during the testnet period, not redeemable for cash.`,
  },
  {
    id: 3,
    question: "How long dose the event duration?",
    answer: `Novemeber 20 - December 17, 2022 (along with the World Cup 2022)`,
  },
  {
    id: 4,
    question: "What is the deposit range?",
    answer: "0 < deposit range < 1000 $BIRD",
  },
  {
    id: 5,
    question:
      "Do i need to attend fully 20 days to be able to get my reward or just 1 day?",
    answer: `No. If you participate for only 1 day at any time during the event and are lucky enough to win, at the end of the event the reward will still be transferred to your wallet.`,
  },
  {
    id: 6,
    question: "When can I get my reward?",
    answer: `As mentioned, your rewards will be transferred to your wallet at the end of the event. Specific time will be updated soon.`,
  },
  {
    id: 7,
    question: "Can I join with more than one account?",
    answer: `That's not our concern. You can join our event with as many accounts as you want.`,
  },
  {
    id: 8,
    question: "Is it considered as a Sport Betting event?",
    answer: `This is definitely NOT a sports betting event. Our event is a testnet for the Firebird project and unlike betting, we are willing to spend the full amount of the bonus as mentioned without getting any money back.`,
  },
  {
    id: 9,
    question:
      "In case of objective situations such as schedule changes, or any disqualification ,... what will happen to the predicted results and the match results?",
    answer: `In case of force majeure events that cause a match listed on the schedule to be canceled, the result of that match will also be canceled and users can claim back their deposit. We will have official announcements of any changes in the match schedule and make reasonable adjustments.`,
  },

  {
    id: 10,
    question: "What is the value of $BIRD in the long-term?",
    answer: `$BIRD has no cash value in this testnet but it will serve for future Firebird events. Keep them to have a advantage for our programs in the future.`,
  },
];

const FaqPage = () => {
  return (
    <LandingLayout>
      <div className="max-w-screen-main w-full mx-auto pt-40 px-[200px] pb-[220px]">
        <HeadingPrimary
          title="Frequently Asked Questions"
          backroundTitle="FAQ"
        />
        <div className={clsx("flex flex-col gap-3")}>
          {faqs.map((item) => (
            <Disclosure key={item.id}>
              {({ open }) => (
                <div
                  className={clsx(
                    "flex flex-col w-full cursor-pointer rounded-[20px] overflow-hidden transition-colors",
                    open ? "bg-black text-white" : "bg-[#F2F2F2] text-black",
                  )}
                >
                  <Disclosure.Button
                    className={clsx(
                      "flex justify-between items-start gap-2 outline-none pt-6 px-8",
                    )}
                  >
                    <span className="flex-1 block text-left text-24/32 font-tthoves font-semibold">
                      {item.question}
                    </span>
                    <div className="mt-1 ml-2 w-5 h-5">
                      <img
                        src={
                          open
                            ? "./images/icon-minus.svg"
                            : "./images/icon-plus.svg"
                        }
                        alt=""
                      />
                    </div>
                  </Disclosure.Button>
                  <Transition
                    className="overflow-hidden"
                    enter="transition transition-[max-height] duration-500 ease-in"
                    enterFrom="transform max-h-0"
                    enterTo="transform max-h-screen"
                    leave="transition transition-[max-height] duration-500 ease-out"
                    leaveFrom="transform max-h-screen"
                    leaveTo="transform max-h-0"
                  >
                    <Disclosure.Panel className="whitespace-pre-line break-words">
                      {({ close }) => (
                        <span
                          className="pl-8 pr-16 pt-3 block text-18/32 font-inter opacity-80"
                          onClick={() => {
                            close();
                          }}
                        >
                          {item.answer}
                        </span>
                      )}
                    </Disclosure.Panel>
                  </Transition>
                  <Disclosure.Button className="h-6"></Disclosure.Button>
                </div>
              )}
            </Disclosure>
          ))}
        </div>
      </div>
    </LandingLayout>
  );
};

export default FaqPage;
