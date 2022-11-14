export const scrollToId = (id: string) => {
  const section = document.querySelector(id);
  section?.scrollIntoView({ behavior: "smooth", block: "start" });
};
