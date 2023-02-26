import BattleshipView from "./DOM/BattleshipView.js";
import BattleshipGame from "./components/BattleshipGame .js";

// loadHomescreen();

//controller works with data and receive alerts from data
//tells view to update based on data

class BattleshipViewModel {
    constructor(view) {
        this.viewModel = { state: "homePage" };
        this.model = null;
        this.view = view;
        this.updateView(this.viewModel);
    }

    updateViewModel(viewModel) {
        for (let key in viewModel) {
            this.viewModel[key] = viewModel[key];
        }
        this.updateView(this.viewModel);
    }

    updateView(viewModel) {
        let update = this.view.updateView(viewModel);
        if (update.listeners) {
            this.handleListeners(update.listeners);
        }
    }

    handleListeners(listenerArray) {
        listenerArray.forEach((listener) => {
            listener.targetElem.addEventListener(listener.event, (e) => {
                if (listener.type === "stateChange") {
                    if (listener.newState === "namePage") {
                        this.updateViewModel({
                            state: listener.newState,
                        });
                    }
                    if (listener.newState === "mapPage") {
                        this.updateViewModel({
                            state: listener.newState,
                            playerName: listener.formElem.value,
                        });
                    }
                    if (listener.newState === "gamePage") {
                        this.startGame();
                        this.updateViewModel({
                            state: listener.newState,
                            note: null,
                            difficulty: listener.targetElem.id,
                        });
                    }
                }
                if (listener.type === "noteUpdate") {
                    this.updateViewModel({
                        note: listener.targetElem.id,
                    });
                }
            });
        });
    }

    startGame() {
        this.model = new BattleshipGame(
            JSON.parse(JSON.stringify(this.viewModel))
        );
        this.updateViewModel(this.model);
    }
    updateBoard() {}

    handleMove() {}

    endGame() {}
}

new BattleshipViewModel(new BattleshipView({ state: "homePage" }));

// class Model {
//     constructor(initModel, listener) {
//         this.model = initModel;
//         this.listener = listener;

//     }

//     updateModel(obj) {
//         //update model
//         for (let key in obj) {
//             this.model[key] = obj[key];
//         }
//         this.listener(this.model);
//     }
// }

// const newModel = new Model({state: null, game: null}, renderView);
// newModel.updateModel({});

// function renderView(model) {
//     if (!model.state) {
//         initApp();
//     }
//     if (model.state === "pg2") {
//         loadPage2();
//     }
//     if (model.game) {
//     }
// }

// function initApp() {
//     let container = document.querySelector("#container");
//     let button = elem({
//         prop: "button",
//         type: "button",
//         textContent: "Enter",
//     });
//     button.addEventListener("click", () => {
//         newModel.updateModel({ state: "pg2" });
//     });
//     container.appendChild(button);
// }

// function loadPage2() {
//     let container = document.querySelector("#container");
//     let button = elem({
//         prop: "button",
//         type: "button",
//         textContent: "PAGE 2 BUTTON",
//     });
//     button.addEventListener("click", () => {
//         newModel.updateModel({ state: "pg3", game: new Game() });
//     });
//     container.appendChild(button);
// }
