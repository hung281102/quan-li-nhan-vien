const functions = {
  formatDate: function (date, format) {
    if (!date) return;
    switch (format) {
      case "dd-mm-yyyy":
        return date.split("T")[0].split("-").reverse().join("/");

      case "yyyy-mm-dd":
        return date.split("T")[0].split("-").join("/");

      default:
        break;
    }
  },
  formatMoney: function (money) {
    if (!money) {
      return;
    }
    return money.toLocaleString("de-DE");
  },
  clickOutSide: function (event, arraySelector, isShow) {
    for (let index = 0; index < arraySelector.length; index++) {
      if (!event.target.classList.contains(arraySelector[index])) {
        isShow = false;
      }
    }
  },
};

export default functions;
