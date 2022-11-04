type MatchNameProps = {
  team1: { name: string; icon: string };
  team2: { name: string; icon: string };
};

const MatchName = (props: MatchNameProps) => {
  const { team1, team2 } = props;
  return (
    <div className="flex items-center space-x-2">
      <img src={team1?.icon} alt="" className="w-5 h-5" />
      <span className="font-semibold">{team1?.name} vs</span>
      <img src={team2?.icon} alt="" className="w-5 h-5" />
      <span className="font-semibold">{team2?.name}</span>
    </div>
  );
};

export default MatchName;
