var products = {
    // (A) PRODUCTS LIST
    list : {
      1 : { name:"Deep Fried Grouper Fish Fillet Wrapper With Glutinous Rice", img:"images1.png", price: 16.38 },
      2 : { name:"Roasted Iberico Pork Ribs", img:"images2.png", price: 11.56 },
      3 : { name:"Roasted Sliced Duck & Sliced Mango In Pecking Style", img:"images3.png", price: 16.38 },
      4 : { name:"Deep Fried Fish Fillet With Pomegranate In Orange Juice", img:"images4.png", price: 11.56 },
      5 : { name:"Braised Sea Cucumber With White Tofu In Spicy Sauce", img:"images5.png", price: 8.86 },
      6 : { name:"Steamed Red Tilapia Fish With Lemon Grass & Green", img:"images6.png", price: 21.20 },
      7 : { name:"Steamed White Tofu With Red Caviar & Crystal Prawn Cubes", img:"images7.png", price: 6.74 },
      8 : { name:"Stir Fried Crystal Prawn Cubes With Omelettes & Tomatoes", img:"images8.png", price: 9.15 },
      9 : { name:"Baked Chicken Chop With Potatoes & Mixed Herbs", img:"images9.png", price: 6.74 },
      10 : { name:"Double Boiled Ficus Carica With Pear Soup & Dried Scallop", img:"images10.png", price: 4.34 },
      11 : { name:"Tilapia Fish with Cabbage in Supereme Soup", img:"images11.png", price: 7.59 },
      12 : { name:"Shark's Fin Soup with Papaya", img:"images12.png", price: 100 },
      13 : { name:"Genting Noodle Superior Soup (Half Chicken)", img:"images13.png", price: 7.59 },
      14 : { name:"Genting Tomato Soup Series", img:"images14.png", price:  34.69},
      15 : { name:"Orange Juice", img:"images15.png", price: 2.28 },
      16 : { name:"I believe I can fly, I believe I can reach the sky", img:"images16.png", price: 99.99 },
      17 : { name:"Osmanthus Wine Jelly Cake with Wolfberries", img:"images17.png", price: 11.30 },
      18 : { name:"Sweet rice balls", img:"images18.png", price: 3.45 },
    },
  
    // (B) DRAW HTML PRODUCTS LIST
    draw : () => {
      // (B1) TARGET WRAPPER
      const wrapper = document.getElementById("poslist");
  
      // (B2) CREATE PRODUCT HTML
      for (let pid in products.list) {
        // CURRENT PRODUCT
        let p = products.list[pid],
            pdt = document.createElement("div"),
            segment;
  
        // PRODUCT SEGMENT
        pdt.className = "pwrap";
        pdt.onclick = () => { cart.add(pid); };
        wrapper.appendChild(pdt);
  
        // IMAGE
        segment = document.createElement("img");
        segment.className = "pimg";
        segment.src = "images/" + p.img;
        pdt.appendChild(segment);
        
        // DETAIL
        detail = document.createElement("div")
        detail.className = "item-detail";

        // NAME
        segment = document.createElement("div");
        segment.className = "pname";
        segment.innerHTML = p.name;
        let name_number = document.createElement("span");
        name_number.innerHTML =  pid + ". "
        segment.prepend(name_number);
        detail.appendChild(segment);
  
        // PRICE
        segment = document.createElement("div");
        segment.className = "pprice";

        let fin_price = document.createElement("span")
        fin_price.innerHTML = "$" + p.price;
        segment.appendChild(fin_price);

        let add_to_cart = document.createElement("img");
        add_to_cart.src = "images/add-to-cart.png";
        segment.appendChild(add_to_cart);
        detail.appendChild(segment);

        pdt.appendChild(detail);
      }
    }
  };
  window.addEventListener("DOMContentLoaded", products.draw);
  
  var cart = {
    // (A) PROPERTIES
    items : {}, // CURRENT ITEMS IN CART
  
    // (B) SAVE CURRENT CART INTO LOCALSTORAGE
    save : () => {
      localStorage.setItem("cart", JSON.stringify(cart.items));
    },
  
    // (C) LOAD CART FROM LOCALSTORAGE
    load : () => {
      cart.items = localStorage.getItem("cart");
      if (cart.items == null) { cart.items = {}; }
      else { cart.items = JSON.parse(cart.items); }
    },
  
    // (D) NUKE CART!
    nuke : () => {
      cart.items = {};
      localStorage.removeItem("cart");
      cart.list();
    },
  
    // (E) INITIALIZE - RESTORE PREVIOUS SESSION
    init : () => {
      cart.load();
      cart.list();
    },
  
    // (F) LIST CURRENT CART ITEMS (IN HTML)
    list : () => {
      // (F1) DRAW CART INIT
      var wrapper = document.getElementById("poscart"),
          item, part, pdt,
          total = 0, subtotal = 0,
          empty = true;
      wrapper.innerHTML = "";
      for (let key in cart.items) {
        if (cart.items.hasOwnProperty(key)) { empty = false; break; }
      }
  
      // (F2) CART IS EMPTY
      if (empty) {
        item = document.createElement("div");
        item.innerHTML = "Cart is empty";
        wrapper.appendChild(item);
      }
  
      // (F3) CART IS NOT EMPTY - LIST ITEMS
      else {
        for (let pid in cart.items) {
          // CURRENT ITEM
          pdt = products.list[pid];
          item = document.createElement("div");
          item.className = "citem";
          wrapper.appendChild(item);
  
          // ITEM NAME
          part = document.createElement("span");
          part.innerHTML = pdt.name;
          part.className = "cname";
          item.appendChild(part);
  
          // REMOVE
          part = document.createElement("input");
          part.type = "button";
          part.value = "X";
          part.className = "cdel";
          part.onclick = () => { cart.remove(pid); };
          item.appendChild(part);
  
          // QUANTITY
          part = document.createElement("input");
          part.type = "number";
          part.min = 0;
          part.value = cart.items[pid];
          part.className = "cqty";
          part.onchange = function () { cart.change(pid, this.value); };
          item.appendChild(part);
  
          // SUBTOTAL
          subtotal = cart.items[pid] * pdt.price;
          total += subtotal;
        }
  
        // TOTAL AMOUNT
        item = document.createElement("div");
        item.className = "ctotal";
        item.id = "ctotal";
        item.innerHTML ="TOTAL: $" + total;
        wrapper.appendChild(item);
  
        // EMPTY BUTTON
        item = document.createElement("input");
        item.type = "button";
        item.value = "Empty";
        item.onclick = cart.nuke;
        item.id = "cempty";
        wrapper.appendChild(item);
  
        // CHECKOUT BUTTON
        item = document.createElement("input");
        item.type = "button";
        item.value = "Checkout";
        item.onclick = cart.checkout;
        item.id = "ccheckout";
        wrapper.appendChild(item);
      }
    },
  
    // (G) ADD ITEM TO CART
    add : (pid) => {
      if (cart.items[pid] == undefined) { cart.items[pid] = 1; }
      else { cart.items[pid]++; }
      cart.save(); cart.list();
    },
  
    // (H) CHANGE QUANTITY
    change : (pid, qty) => {
      // (H1) REMOVE ITEM
      if (qty <= 0) {
        delete cart.items[pid];
        cart.save(); cart.list();
      }
  
      // (H2) UPDATE TOTAL ONLY
      else {
        cart.items[pid] = qty;
        var total = 0;
        for (let id in cart.items) {
          total += cart.items[pid] * products.list[pid].price;
          document.getElementById("ctotal").innerHTML ="TOTAL: $" + total;
        }
      }
    },
  
    // (I) REMOVE ITEM FROM CART
    remove : (pid) => {
      delete cart.items[pid];
      cart.save(); cart.list();
    },
  
    // (J) CHECKOUT
    checkout : () => {
      orders.print();
      orders.add();
    }
  };
  window.addEventListener("DOMContentLoaded", cart.init);
  
  var orders = {
    // (A) PROPERTY
    idb : window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB,
    posdb : null,
    db : null,
  
    // (A) INIT - CREATE DATABASE
    init : () => {
      // (A1) INDEXED DATABASE OBJECT
      if (!orders.idb) {
        alert("INDEXED DB IS NOT SUPPORTED ON THIS BROWSER!");
        return false;
      }
  
      // (A2) OPEN POS DATABASE
      orders.posdb = orders.idb.open("JSPOS", 1);
      orders.posdb.onsuccess = () => {
        orders.db = orders.posdb.result;
      };
  
      // (A3) CREATE POS DATABASE
      orders.posdb.onupgradeneeded = () => {
        // ORDERS STORE (TABLE)
        var db = orders.posdb.result,
        store = db.createObjectStore("Orders", {keyPath: "oid", autoIncrement: true}),
        index = store.createIndex("time", "time");
  
        // ORDER ITEMS STORE (TABLE)
        store = db.createObjectStore("Items", {keyPath: ["oid", "pid"]}),
        index = store.createIndex("qty", "qty");
      };
  
      // (A4) ERROR!
      orders.posdb.onerror = (err) => {
        alert("ERROR CREATING DATABASE!");
        console.error(err);
      };
    },
  
    // (B) ADD NEW ORDER
    add : () => {
      // (B1) INSERT ORDERS STORE (TABLE)
      var tx = orders.db.transaction("Orders", "readwrite"),
          store = tx.objectStore("Orders"),
          req = store.put({time: Date.now()});
  
      // (B2) THE PAINFUL PART - INDEXED DB IS ASYNC
      // HAVE TO WAIT UNTIL ALL IS ADDED TO DB BEFORE CLEAR CART
      // THIS IS TO TRACK THE NUMBER OF ITEMS ADDED TO DATABASE
      var size = 0, entry;
      for (entry in cart.items) {
        if (cart.items.hasOwnProperty(entry)) { size++; }
      }
  
      // (B3) INSERT ITEMS STORE (TABLE)
      entry = 0;
      req.onsuccess = (e) => {
        tx = orders.db.transaction("Items", "readwrite"),
        store = tx.objectStore("Items"),
        oid = req.result;
        for (let pid in cart.items) {
          req = store.put({oid: oid, pid: pid, qty: cart.items[pid]});
  
          // (B4) EMPTY CART ONLY AFTER ALL ENTRIES SAVED
          req.onsuccess = () => {
            entry++;
            if (entry == size) { cart.nuke(); }
          };
        }
      };
    },
  
    // (C) PRINT RECEIPT FOR CURRENT ORDER
    print : () => {
      // (C1) GENERATE RECEIPT
      var wrapper = document.getElementById("posreceipt");
      wrapper.innerHTML = "";
      for (let pid in cart.items) {
        let item = document.createElement("div");
        item.innerHTML = `${cart.items[pid]} X ${products.list[pid].name}`;
        wrapper.appendChild(item);
      }
  
      // (C2) PRINT
      var printwin = window.open();
      printwin.document.write(wrapper.innerHTML);
      printwin.stop();
      printwin.print();
      printwin.close();
    }
  };
  window.addEventListener("DOMContentLoaded", orders.init);
  

  // test