export const scrollToId = (id: string) => {
  const el: any = document.querySelector(id);

  const top = window.scrollY + el.getBoundingClientRect().top - 50;
  window.scrollTo({ top, behavior: "smooth" });
};
