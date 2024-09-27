function bindEvents() {
    const container = document.querySelector(".container");
    container.addEventListener("mouseover", (event) => {
    if (event.target.classList.contains("element")) {
        event.target.style["background-color"] = "lightcoral";
    }
    });
    
    const button = document.querySelector("button");
    button.addEventListener("click", () => {
        let grid_size = parseInt(prompt("Please enter the desired grid size [1-100]: ", "1"));
        if (!grid_size || isNaN(grid_size) || grid_size < 0) grid_size = 1;
        grid_size = grid_size > 100 ? 100 : grid_size;

        clearElements();
        generateGrid(grid_size);
    });
}



function getElementSize(elem_count) {
    const body = document.querySelector("body");
    const button = document.querySelector("button");
    const container = document.querySelector(".container");

    const body_width = body.clientWidth;
    const body_height = body.clientHeight;
    const body_style = window.getComputedStyle(body);
    const body_gap = parseInt(body_style.getPropertyValue("gap"));
    const body_padding = parseInt(body_style.getPropertyValue("padding"));

    const button_height = button.clientHeight;

    const container_style = window.getComputedStyle(container);
    const container_gap = parseInt(container_style.getPropertyValue("gap"));
    const container_padding = parseInt(container_style.getPropertyValue("padding"));


    console.log(`Size: ${body_width} x ${body_height}`);
    console.log(`Size button: ${button_height}`);

    const gap_space_horizontal = (elem_count - 1) * container_gap + 2 * container_padding + 2 * body_padding;
    const gap_space_vertical = button_height + body_gap + (elem_count - 1) * container_gap + 2 * container_padding + 2 * body_padding;

    const element_width = (body_width - gap_space_horizontal) / elem_count;
    const element_height = (body_height - gap_space_vertical) / elem_count;

    console.log(`Item size: ${element_width} x ${element_height}`);

    return [element_width, element_height]
}

function clearElements() {
    const rows = document.querySelectorAll(".row");
    rows.forEach((row) => row.remove());
}

function generateGrid (grid_size) {

    let element_width, element_height;
    [element_width, element_height] = getElementSize(grid_size);

    const container = document.querySelector(".container");

    // Set width and height to less one since we need squares
    const item_size = Math.min(element_height, element_width)

    for (let i = 0; i < grid_size; ++i) {
        const row = document.createElement("div");
        row.classList.add("row");
        for (let j = 0; j < grid_size; ++j) {
            const item = document.createElement("div");

            item.style["width"] = `${item_size}px`;
            item.style["height"] = `${item_size}px`;
            item.classList.add("element");
            row.appendChild(item);
        }
        container.appendChild(row);
    }
}

const DEFAULT_SIZE = 16;
generateGrid(DEFAULT_SIZE);
bindEvents();
