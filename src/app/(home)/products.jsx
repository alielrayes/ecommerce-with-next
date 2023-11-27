import Link from "next/link";
import React from "react";

// const arr = [
//   { productImg: "./images/1.png" },
//   { productImg: "./images/2.webp" },
//   { productImg: "./images/3.webp" },
//   { productImg: "./images/4.webp" },
//   { productImg: "./images/5.webp" },
//   { productImg: "./images/6.webp" },
//   { productImg: "./images/7.webp" },
//   { productImg: "./images/8.png" },
// ];

async function getData() {

  // await new Promise(resolve => setTimeout(resolve, 3000))
  
  const res = await fetch("http://localhost:4000/products", {
    next: { revalidate: 0 },
  });

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

const Products = async () => {
  const arrData = await getData();

  return (
    <section className="products flex">
      {arrData.map((item) => {
        return (
          <article title={item.title} key={item.id} className="card">
            <Link href={`/product-details/${item.id}`}>
              <img width={266}   src={item.productImg} alt=""  />
            </Link>
            <div style={{ width: "266px" }} className="content">
              <h1 className="title">{item.title.slice(0, 15)}...</h1>
              <p className="description">
                {item.description.slice(0, 111)}....
              </p>
              <div
                className="flex"
                style={{
                  justifyContent: "space-between",
                  paddingBottom: "0.7rem",
                }}
              >
                <div className="price">${item.price}</div>
                <button className="add-to-cart flex">
                  <i className="fa-solid fa-cart-plus" />
                  Add To Cart
                </button>
              </div>
            </div>
          </article>
        );
      })}
    </section>
  );
};

export default Products;
