import "./style.css";

export const render = () => {
  const app = document.querySelector<HTMLDivElement>("#app")!;
  app.innerHTML = `
    <h1>Hello Vite!</h1>
    <p target="_blank">This is hmr test.123</p>
     <p target="_blank">T1231231234234hi2s t.123 这是增1加的文本1</p>
  `;
};
// if (import.meta.hot) {
//   import.meta.hot.accept((mod) => {
//     console.log(mod);
//     mod.render();
//   });
// }
