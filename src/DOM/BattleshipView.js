import homePage from "./homePage.js";
import namePage from "./namePage.js";
import mapPage from "./mapPage.js";
import buildNote from "./buildNote.js";
import gamePage from "./gamePage.js";

class BattleshipView {
    constructor(viewModel) {
        this.oldModel = viewModel;
        this.container = document.querySelector("#container");
    }

    updateViewModel(viewModel) {
        for (let key in viewModel) {
            this.oldModel[key] = viewModel[key];
        }
    }

    updateView(newViewModel) {
        let newView = this.createView(newViewModel);
        this.renderView(newView);
        this.updateViewModel(newViewModel);
        return newView;
    }

    createView(newViewModel) {
        console.log(newViewModel);
        console.log(this.oldModel);
        let view = null;
        if (
            newViewModel.state !== this.oldModel.state ||
            newViewModel.state === "homePage"
        ) {
            switch (newViewModel.state) {
                case "homePage":
                    view = homePage();
                    break;
                case "namePage":
                    this.container =
                        document.querySelector(".newGameContainer");
                    this.clearContainer();
                    view = namePage();
                    break;
                case "mapPage":
                    this.container = document.querySelector("#container");
                    let oldPage = document.querySelector(".homepageContainer");
                    oldPage.classList.add("hide");
                    setTimeout(() => oldPage.remove(), 750);
                    view = mapPage(newViewModel);
                    break;
                case "gamePage":
            }
        }
        if (newViewModel.note) {
            const note = document.querySelector(".noteContainer") || null;
            if (note) note.remove();
            this.container = document.querySelector(".map");
            view = buildNote(newViewModel);
        }

        return view;
    }

    renderView(newView, container = this.container) {
        container.appendChild(newView.element);
    }

    clearContainer(container = this.container) {
        while (container.firstChild) {
            container.firstChild.remove();
        }
    }
}

export default BattleshipView;
