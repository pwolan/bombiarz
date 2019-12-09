const checkAreInputsCorrect = () => {
  let inputs = document.querySelectorAll(".start-values");
  inputs = Array.from(inputs);
  let isInvalid = inputs.find(input => {
    return input.value === "";
  });
  if (isInvalid) {
    alert("niewypełnione pola!");
  }
  const { width, height, mines } = getFormValues();
  if (mines >= width * height) {
    isInvalid = true;
    alert("Tyle min sie nie zmieści!");
    document.getElementById("mines").style.borderColor = "red";
  } else {
    document.getElementById("mines").style.borderColor = "black";
  }
  return !isInvalid;
};

// remove letters from inputs
let timeOut = {
  w: null,
  h: null,
  m: null
};
const checkIsTextValid = e => {
  let { value } = e.target;
  switch (e.target.id) {
    case "height":
      if (timeOut.h) {
        clearTimeout(timeOut.h);
      }
      break;
    case "width":
      if (timeOut.w) {
        clearTimeout(timeOut.w);
      }
      break;
    case "mines":
      if (timeOut.m) {
        clearTimeout(timeOut.m);
      }
      break;
  }
  timeOut = setTimeout(() => {
    if (isNaN(value)) {
      e.target.value = "";
    }
  }, 1000);
  return timeOut;
};

const clearInputs = () => {
  let inputs = document.querySelectorAll(".start-values");
  inputs.forEach(input => {
    input.value = "";
  });
};

const getFormValues = () => {
  let height = document.getElementById("height").value;
  height = parseInt(height);
  let width = document.getElementById("width").value;
  width = parseInt(width);
  let mines = document.getElementById("mines").value;
  mines = parseInt(mines);
  return {
    height,
    width,
    mines
  };
};

const getCookies = () => {
  let data = document.cookie.split(";");

  return data.map(user => {
    return {
      name: user.split("=")[0],
      time: user.split("=")[0].split("/")[0],
      mode: user.split("=")[0].split("/")[1]
    };
  });
};

const parseCookies = (height, width, minesCount) => {
  let cookies = document.cookie;
  cookies = decodeURIComponent(cookies);

  cookies = cookies.split("; ");
  let data = cookies.filter(
    cookie => cookie.split("=")[0] === `${height}|${width}|${minesCount}`
  );
"xd".c
  if (data.length > 0) {
    console.log(data);
    data = data[0].split("=")[1];
    data = data.trim().split("@");
    data.pop();
    console.log(data);
    let d = data.map(user => ({
      username: user.split("#")[0].split(":")[1],
      time: user.split("#")[1].split(":")[1]
    }));
    console.log(d);
    d.sort((a, b) => a.time - b.time);
    if (d.length > 10) {
      d = d.slice(0, 10);
    }

    return d;
  }

  return data;
};
