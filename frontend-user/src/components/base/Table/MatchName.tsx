type MatchNameProps = {
  team1: { name: string; icon: string };
  team2: { name: string; icon: string };
};

const MatchName = (props: MatchNameProps) => {
  const { team1, team2 } = props;
  return (
    <div className="flex items-center">
      <span className="text-14/24 mr-1">vs</span>
      <div>
        <div className="flex items-center flex-1">
          <img src={team1?.icon} alt="" className="w-[18px] h-[18px]" />
          <p className="font-semibold ml-1.5 text-14/20 capitalize">
            {team1?.name.toLowerCase()}
          </p>
        </div>
        <div className="flex items-center flex-1">
          <img src={team2?.icon} alt="" className="w-[18px] h-[18px]" />
          <span className="font-semibold ml-1.5 text-14/20 capitalize">
            {team2?.name.toLowerCase()}
          </span>
        </div>
      </div>
    </div>
  );
};

export default MatchName;
