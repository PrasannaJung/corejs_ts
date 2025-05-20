"use strict";
const addRecipeBtn = document.getElementById("add-recipe-btn");
const addRecipeModal = document.getElementById("add-recipe-modal");
const modalOverlay = document.getElementById("modal-overlay");
const closeModalBtn = document.querySelector("#add-recipe-modal .close-button");
const addRecipeForm = document.getElementById("add-recipe-form");
const recipeListElement = document.getElementById("recipes");
const searchInput = document.getElementById("search-input");
const searchButton = document.getElementById("search-button");
const recipeDetailsSection = document.getElementById("recipe-details");
const detailTitle = document.getElementById("detail-title");
const detailIngredientsList = document.getElementById("detail-ingredients");
const detailInstructionsList = document.getElementById("detail-instructions");
const closeDetailsBtn = document.getElementById("close-details-btn");
const detailCommentsList = document.getElementById("detail-comments-list");
const detailNewCommentText = document.getElementById("detail-new-comment-text");
const detailAddCommentBtn = document.getElementById("detail-add-comment-btn");
const recipeList = [
    {
        id: 1,
        title: "Delicious Pancakes",
        ingredients: ["Flour", "Eggs", "Milk", "Sugar", "Baking Powder"],
        instructions: [
            "Mix dry ingredients.",
            "Whisk in wet ingredients.",
            "Cook on griddle.",
        ],
        stars: 0,
        comments: [],
    },
    {
        id: 2,
        title: "Spaghetti Carbonara",
        ingredients: [
            "Spaghetti",
            "Eggs",
            "Guanciale",
            "Pecorino Romano Cheese",
            "Black Pepper",
        ],
        instructions: [
            "Cook spaghetti.",
            "Whisk eggs and cheese.",
            "Combine with pasta and guanciale.",
        ],
        stars: 0,
        comments: [],
    },
];
function renderRecipeList(recipes) {
    recipeListElement.innerHTML = "";
    recipes.forEach((recipe) => {
        const listItem = document.createElement("li");
        listItem.classList.add("recipe-item");
        listItem.dataset.recipeId = recipe.id.toString();
        listItem.innerHTML = `
            <h3>${recipe.title}</h3>
            <p class="ingredients">
              <strong>Ingredients:</strong> 
              ${recipe.ingredients.join(", ")}
            </p>
            <button class="view-details-btn" data-id="${recipe.id}">View Details</button>
            <button class="star-btn" data-id="${recipe.id}">
              ⭐ <span class="star-count">${recipe.stars}</span>
            </button>
            <div class="comments-section" data-id="${recipe.id}">
              <h4>Comments</h4>
              <ul class="comments-list">
                ${recipe.comments
            ? recipe.comments
                .map((comment) => `<li class="comment-item">${comment.text}</li>`)
                .join("")
            : ""}
              </ul>
              <textarea
                class="new-comment-text"
                placeholder="Add a comment"
              ></textarea>
              <button class="add-comment-btn" data-id="${recipe.id}">Post</button>
            </div>
          `;
        recipeListElement.appendChild(listItem);
    });
    attachRecipeEventListeners();
}
function renderRecipeDetails(recipe) {
    detailTitle.textContent = recipe.title;
    detailIngredientsList.innerHTML = recipe.ingredients
        .map((ing) => `<li>${ing}</li>`)
        .join("");
    detailInstructionsList.innerHTML = recipe.instructions
        .map((step) => `<li>${step}</li>`)
        .join("");
    detailCommentsList.innerHTML = recipe.comments
        ? recipe.comments
            .map((comment) => `<li class="comment-item">${comment.text}</li>`)
            .join("")
        : "";
    detailAddCommentBtn.dataset.recipeId = recipe.id.toString();
    recipeDetailsSection.classList.remove("hidden");
}
addRecipeForm === null || addRecipeForm === void 0 ? void 0 : addRecipeForm.addEventListener("submit", function (event) {
    event.preventDefault();
    const recipeTitle = document.getElementById("new-recipe-title").value.trim();
    const recipeIngredients = document.getElementById("new-recipe-ingredients").value.trim();
    const recipeInstructions = document.getElementById("new-recipe-instructions").value.trim();
    const ingredientsArray = recipeIngredients
        .split(",")
        .map((item) => item.trim());
    const instructionsArray = recipeInstructions
        .split("\n")
        .map((item) => item.trim())
        .filter((item) => item !== "");
    if (recipeTitle &&
        ingredientsArray.length > 0 &&
        instructionsArray.length > 0) {
        const recipeId = recipeList.length > 0 ? Math.max(...recipeList.map((r) => r.id)) + 1 : 1;
        const newRecipe = {
            id: recipeId,
            title: recipeTitle,
            ingredients: ingredientsArray,
            instructions: instructionsArray,
            stars: 0,
            comments: [],
        };
        recipeList.push(newRecipe);
        renderRecipeList(recipeList);
        addRecipeForm.reset();
        addRecipeModal.classList.add("hidden");
        modalOverlay.classList.add("hidden");
    }
    else {
        alert("Please fill in all recipe details.");
    }
});
searchButton.addEventListener("click", () => {
    const query = searchInput.value.trim().toLowerCase();
    const searchResults = recipeList.filter((recipe) => recipe.title.toLowerCase().includes(query) ||
        recipe.ingredients.some((ingredient) => ingredient.toLowerCase().includes(query)));
    renderRecipeList(searchResults);
});
function starRecipe(recipeId) {
    const recipe = recipeList.find((r) => r.id === recipeId);
    if (recipe) {
        recipe.stars++;
        renderRecipeList(recipeList);
    }
}
function addComment(recipeId, commentText) {
    const recipe = recipeList.find((r) => r.id === recipeId);
    if (recipe && commentText.trim() !== "") {
        const newComment = {
            userId: "user-1",
            text: commentText.trim(),
        };
        recipe.comments ? recipe.comments.push(newComment) : [];
        renderRecipeList(recipeList);
    }
}
function attachRecipeEventListeners() {
    document.querySelectorAll(".view-details-btn").forEach((button) => {
        if (button instanceof HTMLElement) {
            button.addEventListener("click", () => {
                const recipeId = parseInt(button.dataset.id);
                const recipe = recipeList.find((r) => r.id === recipeId);
                if (recipe) {
                    renderRecipeDetails(recipe);
                }
            });
        }
    });
    document.querySelectorAll(".star-btn").forEach((button) => {
        if (button instanceof HTMLElement) {
            button.addEventListener("click", () => {
                const recipeId = parseInt(button.dataset.id);
                starRecipe(recipeId);
            });
        }
    });
    document.querySelectorAll(".add-comment-btn").forEach((button) => {
        if (button instanceof HTMLElement) {
            button.addEventListener("click", () => {
                var _a, _b;
                const recipeId = parseInt(button.dataset.id);
                const commentText = ((_a = button.parentNode) === null || _a === void 0 ? void 0 : _a.querySelector(".new-comment-text")).value;
                addComment(recipeId, commentText);
                ((_b = button.parentElement) === null || _b === void 0 ? void 0 : _b.querySelector(".new-comment-text")).value = "";
            });
        }
    });
}
addRecipeBtn.addEventListener("click", () => {
    addRecipeModal.classList.remove("hidden");
    modalOverlay.classList.remove("hidden");
});
closeModalBtn.addEventListener("click", () => {
    addRecipeModal.classList.add("hidden");
    modalOverlay.classList.add("hidden");
});
modalOverlay.addEventListener("click", (event) => {
    if (event.target === modalOverlay) {
        addRecipeModal.classList.add("hidden");
        modalOverlay.classList.add("hidden");
    }
});
closeDetailsBtn.addEventListener("click", () => {
    recipeDetailsSection.classList.add("hidden");
});
renderRecipeList(recipeList);
detailAddCommentBtn.addEventListener("click", () => {
    const recipeId = parseInt(detailAddCommentBtn.dataset.recipeId);
    const commentText = detailNewCommentText.value;
    addComment(recipeId, commentText);
    detailNewCommentText.value = "";
});
console.log("HELLO WORLD");
