import MenuLink from "../MenuLink/MenuLink";



const ShopLink = () => {
  const subLinks = [
    {
      _id: 1,
      name: "Процедури",
      url: "/procedures",
    },
    {
      _id: 2,
      name: "Продукти",
      url: "/products",
    },
  ];
  return <MenuLink name={"Магазин"} subLinks={subLinks}  url="/shop"/>;
};

export default ShopLink;
