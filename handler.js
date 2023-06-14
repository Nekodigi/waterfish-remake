const changeBtn = () => {
  // next_index = next_index + 1
  const btn = document.getElementById("box3");
  console.log("ddd", btn, btn.style);
  if (btn.style.display === "none") {
    btn.style.display = "block";
  } else if (btn.style.display === "block") {
    btn.style.display = "none";
  } else if (btn.style.display === "") {
    btn.style.display = "block";
  }
};
