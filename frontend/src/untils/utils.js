export const translateWOrd = (word) => {
  switch (word) {
    case "floor":
      return "Этаж";
    case "price":
      return "Цвена";
    case "rooms":
      return "Колличество комнат";
    case "area_total":
      return "Общая площадь";
    case "area_kitchen":
      return "Площадь кухни";
    case "area_live":
      return "Жилая площадь";
    default:
      return "Неизвестное слово";
  }
}
