// ////////////////////////////////////////////////// //
// =============== STORAGE CONTROLLER =============== //
// ////////////////////////////////////////////////// //

const StorageCtrl = (function() {
  // Store items in LS

  // Public methods
  return {
    storeItem: function(item) {
      let items;

      // LS can only store strings = turn it into string
      // Check if any items in LS
      if (localStorage.getItem("items") === null) {
        items = [];

        // Push new item
        items.push(item);

        // Set LS
        localStorage.setItem("items", JSON.stringify(items));
      } else {
        // Get data from LS & turn into object
        items = JSON.parse(localStorage.getItem("items"));

        // Push new item
        items.push(item);

        // Reset LS
        localStorage.setItem("items", JSON.stringify(items));
      }
    },

    getItemFromStorage: function() {
      let items;

      // Check if any items in
      if (localStorage.getItem("items") === null) {
        items = [];
      } else {
        items = JSON.parse(localStorage.getItem("items"));
      }
      return items;
    },

    updateItemStorage: function(updatedItem) {
      // Get items From ls
      let items = JSON.parse(localStorage.getItem("items"));

      // Loop throgh items
      items.forEach(function(item, index) {
        if (updatedItem.id === item.id) {
          items.splice(index, 1, updatedItem);
        }
      });

      // Reset LS
      localStorage.setItem("items", JSON.stringify(items));
    },

    deleteItemFromStorage: function(id) {
      // Get items From LS
      let items = JSON.parse(localStorage.getItem("items"));

      // Loop throgh items
      items.forEach(function(item, index) {
        if (id === item.id) {
          items.splice(index, 1);
        }
      });

      // Reset LS
      localStorage.setItem("items", JSON.stringify(items));
    },

    clearItemsFromStorage: function() {
      localStorage.removeItem("items");
    }
  };
})();

// /////////////////////////////////////////////// //
// =============== ITEM CONTROLLER =============== //
// /////////////////////////////////////////////// //

const ItemCtrl = (function() {
  // Item Constructor
  const Item = function(id, name, calories) {
    this.id = id;
    this.name = name;
    this.calories = calories;
  };

  // Data structure / State
  const data = {
    items: StorageCtrl.getItemFromStorage(),
    currentItem: null,
    totalCalories: 0
  };

  // Public methods
  return {
    getItems: function() {
      return data.items;
    },

    addItem: function(name, calories) {
      let ID;
      // Generate an ID
      if (data.items.length > 0) {
        ID = data.items[data.items.length - 1].id + 1;
      } else {
        ID = 0;
      }

      // Calories input string to number. Parse it into number
      calories = parseInt(calories);

      // Create a new item with new keyword, bc Item has a constructor
      newItem = new Item(ID, name, calories);

      // Push it to the end of Item array
      data.items.push(newItem);

      return newItem;
    },

    getItemById: function(id) {
      let found = null;

      // Loop through items
      data.items.forEach(function(item) {
        if (item.id === id) {
          found = item;
        }
      });

      return found;
    },

    // Update data in data structure, not in UI
    updateItem: function(name, calories) {
      // Calories to number
      calories = parseInt(calories);

      let found = null;

      data.items.forEach(function(item) {
        if (item.id === data.currentItem.id) {
          // Set new values
          item.name = name;
          item.calories = calories;

          found = item;
        }
      });

      return found;
    },

    deleteItem: function(id) {
      // Get ID's
      ids = data.items.map(function(item) {
        return item.id;
      });

      // Get index
      const index = ids.indexOf(id);

      // Splice it out from array - take 1 from index
      data.items.splice(index, 1);
    },

    clearAllItems: function() {
      // Delete all items from data
      data.items = [];
    },

    setCurrentItem: function(item) {
      // Set item to current one to edit
      data.currentItem = item;
    },

    getCurrentItem: function() {
      return data.currentItem;
    },

    getTotalCalories: function() {
      // Take item, add calories loop
      let total = 0;

      // Loop throgh items, calories
      data.items.forEach(function(item) {
        total += item.calories;
      });

      // Set totalCalories in data []
      data.totalCalories = total;

      // Return total cal
      return data.totalCalories;
    },

    logData: function() {
      return data;
    }
  };
})();

// ///////////////////////////////////////////// //
// =============== UI CONTROLLER =============== //
// ///////////////////////////////////////////// //
const UICtrl = (function() {
  const UISelectors = {
    itemList: "#item-list",
    listItems: "#item-list li",
    addBtn: ".add-btn",
    updateBtn: ".update-btn",
    deleteBtn: ".delete-btn",
    clearBtn: ".clear-btn",
    backBtn: ".back-btn",
    itemNameInput: "#item-name",
    itemCaloriesInput: "#item-calories",
    totalCalories: ".total-calories"
  };

  // Public methods
  return {
    populateItemList: function(items) {
      let html = "";

      items.forEach(function(item) {
        html += `
        <li class="collection-item" id="item-${item.id}">
          <strong>${item.name}: </strong> <em>${item.calories} Calories</em>
          <a href="#" class="secondary-content"><i class="edit-item fa fa-pencil"></i></a>
        </li>
        `;
      });

      // Insert list items into ul
      document.querySelector(UISelectors.itemList).innerHTML = html;
    },

    getItemInput: function() {
      return {
        name: document.querySelector(UISelectors.itemNameInput).value,
        calories: document.querySelector(UISelectors.itemCaloriesInput).value
      };
    },

    addListItem: function(item) {
      // Show the list
      document.querySelector(UISelectors.itemList).style.display = "block";
      // Create li element
      const li = document.createElement("li");

      // Add class
      li.className = "collection-item";

      // Add ID
      li.id = `item-${item.id}`;

      // Add HTML
      li.innerHTML = `
        <strong>${item.name}: </strong> <em>${item.calories} Calories</em>
        <a href="#" class="secondary-content"><i class="edit-item fa fa-pencil"></i></a>
      `;

      // Insert item
      document
        .querySelector(UISelectors.itemList)
        .insertAdjacentElement("beforeend", li);
    },

    updateListItem: function(item) {
      let listItems = document.querySelectorAll(UISelectors.listItems);

      // Nodelist = conver into array
      listItems = Array.from(listItems);

      listItems.forEach(function(listItem) {
        const itemID = listItem.getAttribute("id");

        if (itemID === `item-${item.id}`) {
          // If true = update
          document.querySelector(`#${itemID}`).innerHTML = `
            <strong>${item.name}: </strong> <em>${item.calories} Calories</em>
            <a href="#" class="secondary-content"><i class="edit-item fa fa-pencil"></i></a>
        `;
        }
      });
    },

    deleteListItem: function(id) {
      const itemID = `#item-${id}`;
      const item = document.querySelector(itemID);

      item.remove();
    },

    clearFields: function() {
      document.querySelector(UISelectors.itemNameInput).value = "";
      document.querySelector(UISelectors.itemCaloriesInput).value = "";
    },

    addItemToForm: function() {
      document.querySelector(
        UISelectors.itemNameInput
      ).value = ItemCtrl.getCurrentItem().name;
      document.querySelector(
        UISelectors.itemCaloriesInput
      ).value = ItemCtrl.getCurrentItem().calories;
      UICtrl.showEditState();
    },

    removeItems: function() {
      let listItems = document.querySelectorAll(UISelectors.listItems);

      // Turn node list into array
      listItems = Array.from(listItems);

      listItems.forEach(function(item) {
        item.remove();
      });
    },

    hideList: function() {
      document.querySelector(UISelectors.itemList).style.display = "none";
    },

    showTotalCalories: function(totalCalories) {
      document.querySelector(
        UISelectors.totalCalories
      ).textContent = totalCalories;
    },

    clearEditState: function() {
      // Clear fields
      UICtrl.clearFields();

      // Hide buttons
      document.querySelector(UISelectors.updateBtn).style.display = "none";
      document.querySelector(UISelectors.deleteBtn).style.display = "none";
      document.querySelector(UISelectors.backBtn).style.display = "none";
      document.querySelector(UISelectors.addBtn).style.display = "inline";
    },

    showEditState: function() {
      // Show buttons
      document.querySelector(UISelectors.updateBtn).style.display = "inline";
      document.querySelector(UISelectors.deleteBtn).style.display = "inline";
      document.querySelector(UISelectors.backBtn).style.display = "inline";
      document.querySelector(UISelectors.addBtn).style.display = "none";
    },

    getSelectors: function() {
      return UISelectors;
    }
  };
})();

// ////////////////////////////////////////////// //
// =============== APP CONTROLLER =============== //
// ////////////////////////////////////////////// //
const AppCtrl = (function(ItemCtrl, StorageCtrl, UICtrl) {
  // Load event listeners
  const loadEventListeners = function() {
    // Get UI Selectors
    const UISelectors = UICtrl.getSelectors();

    // Add item event
    document
      .querySelector(UISelectors.addBtn)
      .addEventListener("click", itemAddSubmit);

    // Disable submit on enter
    document.addEventListener("keypress", function(e) {
      // Check what key was clicked
      // 13 = enter
      // which for older browsers
      if (e.keyCode === 13 || e.which === 13) {
        // disable enter key
        e.preventDefault();
        return false;
      }
    });

    // Edit Icon click event
    document
      .querySelector(UISelectors.itemList)
      .addEventListener("click", itemEditClick);

    // Update item click event
    document
      .querySelector(UISelectors.updateBtn)
      .addEventListener("click", itemUpdateSubmit);

    // Back button event
    document
      .querySelector(UISelectors.backBtn)
      .addEventListener("click", UICtrl.clearEditState);

    // Delete item button event
    document
      .querySelector(UISelectors.deleteBtn)
      .addEventListener("click", itemDeleteSubmit);

    // Clear all button event
    document
      .querySelector(UISelectors.clearBtn)
      .addEventListener("click", clearAllItems);
  };

  // itemAddSubmit function
  const itemAddSubmit = function(e) {
    // get form input from UI controller
    const input = UICtrl.getItemInput();

    // Check input
    if (input.name !== "" && input.calories !== "") {
      // Add item
      const newItem = ItemCtrl.addItem(input.name, input.calories);

      // Add item to UI list
      UICtrl.addListItem(newItem);

      // Get all Calories
      const totalCalories = ItemCtrl.getTotalCalories();

      // Show calories in UI
      UICtrl.showTotalCalories(totalCalories);

      // Store in LS
      StorageCtrl.storeItem(newItem);

      // Clear input fields
      UICtrl.clearFields();
    }

    e.preventDefault();
  };

  // Click item to edit function
  const itemEditClick = function(e) {
    // if clicked on ".edit-class" = fa icon
    if (e.target.classList.contains("edit-item")) {
      // Get list item-id
      const listId = e.target.parentNode.parentNode.id;

      // Break into an array
      const listIdArr = listId.split("-");

      // Get ID
      const id = parseInt(listIdArr[1]);

      // Get item
      const itemToEdit = ItemCtrl.getItemById(id);

      // Set current item
      ItemCtrl.setCurrentItem(itemToEdit);

      // Add item to form
      UICtrl.addItemToForm();
    }

    e.preventDefault();
  };

  // Update item submit
  const itemUpdateSubmit = function(e) {
    // Get item input
    const input = UICtrl.getItemInput();

    // Update item
    const updatedItem = ItemCtrl.updateItem(input.name, input.calories);

    // Update UI
    UICtrl.updateListItem(updatedItem);

    // Get all Calories
    const totalCalories = ItemCtrl.getTotalCalories();

    // Show calories in UI
    UICtrl.showTotalCalories(totalCalories);

    // Update data from LS
    StorageCtrl.updateItemStorage(updatedItem);

    // Clear state
    UICtrl.clearEditState();

    e.preventDefault();
  };

  // Delete item event
  const itemDeleteSubmit = function(e) {
    // Get id from current item
    const currentItem = ItemCtrl.getCurrentItem();

    // Delete from data
    ItemCtrl.deleteItem(currentItem.id);

    // Delete from UI
    UICtrl.deleteListItem(currentItem.id);

    // Get all Calories
    const totalCalories = ItemCtrl.getTotalCalories();

    // Show calories in UI
    UICtrl.showTotalCalories(totalCalories);

    // Delete from LS
    StorageCtrl.deleteItemFromStorage(currentItem.id);

    // Clear state
    UICtrl.clearEditState();

    e.preventDefault();
  };

  // Clear all items event
  const clearAllItems = function(e) {
    // Delete all items from data
    ItemCtrl.clearAllItems();

    // Get all Calories
    const totalCalories = ItemCtrl.getTotalCalories();

    // Show calories in UI
    UICtrl.showTotalCalories(totalCalories);

    // Remove from UI
    UICtrl.removeItems();

    // Remove from LS
    StorageCtrl.clearItemsFromStorage();

    // Hide the list
    UICtrl.hideList();
  };

  // Public methods
  return {
    init: function() {
      // Clear edit state
      UICtrl.clearEditState();

      // Fetch items from data structure
      const items = ItemCtrl.getItems();

      // Check any items already in list
      if (items.length === 0) {
        UICtrl.hideList();
      } else {
        // Populate list with items
        UICtrl.populateItemList(items);
      }

      // Get all Calories from LS
      const totalCalories = ItemCtrl.getTotalCalories();

      // Show calories in UI
      UICtrl.showTotalCalories(totalCalories);

      // Load event listeners
      loadEventListeners();
    }
  };
})(ItemCtrl, StorageCtrl, UICtrl);

AppCtrl.init();
