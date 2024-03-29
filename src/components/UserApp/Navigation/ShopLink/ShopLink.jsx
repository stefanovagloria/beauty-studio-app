import MenuLink from "../MenuLink/MenuLink";

const ShopLink = () => {
  const subLinks = [
    {
        _id: 1,
      name: "Процедури",
    },
    {
        _id: 2,
      name: "Продукти",
    },
  ];
  return <MenuLink name={"Магазин"} subLinks={subLinks} />;
};

export default ShopLink;
