export const InventoryPageLocators = {
  product: {
    container: ".inventory_item",
    name: ".inventory_item_name",
    desc: ".inventory_item_desc",
    image: "img",
    price: ".inventory_item_price"
  },
  cart: {
    icon: ".shopping_cart_link",
    badge: ".shopping_cart_badge"
  },
  menu: {
    button: "#react-burger-menu-btn",
    list: ".bm-item-list",
    logout: "#logout_sidebar_link"
  },
  sort: '[data-test="product-sort-container"]',
  layout: ".inventory_container",
  detailName: ".inventory_details_name"
};
