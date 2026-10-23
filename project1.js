var swiper = new Swiper(".mySwiper", {
    loop: true,
    navigation: {
        nextEl: "#next",
        prevEl: "#prev",
    },
});

const carticon = document.querySelector(".cart-icon")
const cartab = document.querySelector(".cart-tab")
const closebtn = document.querySelector(".close-btn")
const cardlist = document.querySelector(".card-list")
const cartlist = document.querySelector(".cart-list")
const cardtotal = document.querySelector(".card-total")
const carticons = document.querySelector(".cart-value")
const hamburger = document.querySelector(".hamburger");
const mobilemenu = document.querySelector(".mobile-menu");
if (hamburger && mobilemenu) {
    hamburger.addEventListener("click", () => {
        mobilemenu.classList.toggle("mobile-menu-active");
    });
}


carticon.addEventListener("click", () => cartab.classList.add("cart-tab-active"));
closebtn.addEventListener("click", () => cartab.classList.remove("cart-tab-active"))


let productlist = []
let cartProduct = []

const updatetotal = () => {
    let totalprice = 0
    totalquantity = 0
    document.querySelectorAll(".item").forEach(item => {
        const itemtot = parseInt(item.querySelector(".quantity-value").textContent)
        const price = parseFloat(item.querySelector(".item-total").textContent.replace(`$`, ""))
        totalprice += price
        totalquantity += itemtot
    })
    cardtotal.textContent = `$${totalprice.toFixed(2)}`
    carticons.textContent = totalquantity

}
const showmenu = () => {
    productlist.forEach(product => {
        const ordercard = document.createElement("div")
        ordercard.classList.add("order-card");
        ordercard.innerHTML = `
      <div class="card-image">
                <img src="${product.img}">
        </div>
        <h4>${product.name}</h4>
        <h4 class="price">${product.price}</h4>
        <a href="#" class="btn cardbtn">Add to cart</a>
    `
        cardlist.appendChild(ordercard)

        const cardbtn = ordercard.querySelector(".cardbtn")
        cardbtn.addEventListener("click", (e) => {
            e.preventDefault()
            addtocart(product)

        })

    })
}
const addtocart = (product) => {
    const existingProduct = cartProduct.find(item => item.name === product.name)
    if (existingProduct) {
        alert("already added ")
        return
    } cartProduct.push(product)
    let quantity = 1
    let price = parseFloat(product.price.replace(`$`, ''))




    const cartitem = document.createElement("div")
    cartitem.classList.add("item")
    cartitem.innerHTML = `
      <div class="image-container">
                                <img src="${product.img}" >
                            </div>
                            <div class="${product.price}">
                                <h4>${product.name}</h4>
                                <h4 class="item-total">${product.price}</h4>
                            </div>
                            <div class="final flex">
                                <a href="#" class="quantity-item minus">
                                    <i class="fa-solid fa-minus"></i>
                                </a>
                                <h4 class="quantity-value">${quantity}</h4>
                                 <a href="#" class="quantity-item plus">
                                    <i class="fa-solid fa-plus"></i>
                                </a>
                            </div>
    `;
    cartlist.appendChild(cartitem)
    updatetotal()
    let addbtn = cartitem.querySelector(".plus")
    const quantityvalue = cartitem.querySelector(".quantity-value")
    const totalitem = cartitem.querySelector(".item-total")
    const minusbtn = cartitem.querySelector(".minus")
    addbtn.addEventListener("click", (e) => {
        e.preventDefault()
        quantity++
        quantityvalue.textContent = quantity
        totalitem.textContent = `${(price * quantity).toFixed(2)}`
        updatetotal()
    })

    minusbtn.addEventListener("click", (e) => {
        e.preventDefault()
        if (quantity > 1) {
            quantity--;
            quantityvalue.textContent = quantity
            totalitem.textContent = `${(price * quantity).toFixed(2)}`
            updatetotal()
        } else {
            cartitem.classList.add("slide-out")
            setTimeout(() => {
                cartitem.remove()
                cartProduct = cartProduct.filter(item => item.name != product.name)
                updatetotal()
            }, 300)
        }

    })
}

const initapp = () => {
    fetch("menu.json").then(response => response.json())
        .then(data => {
            productlist = data;
            showmenu()
        })
}
initapp()

const links = document.querySelectorAll(".navlist a, .mobile-menu a");
const menu = document.querySelector(".mobile-menu");

links.forEach(link => {
    link.addEventListener("click", () => {
        menu.classList.remove("active"); // close mobile menu
    });
});


