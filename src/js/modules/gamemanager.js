elements = document.querySelectorAll('.elements');
classes = document.querySelectorAll('.elem-class');
circle = document.querySelector('.circle');

class GameManager {
    constructor(elements, classes, circle) {
        this.elements = elements;
        this.classes = classes;
        this.circle = circle;
    }

    receipts = [
        {
            name: "water",
            elemClass: 1,
            index: ["water"],
            desription: "Вода"
        },
        {
            name: "stone",
            elemClass: 1,
            index: ["stone"],
            desription: "Камень"
        },
        {
            name: "fire",
            elemClass: 1,
            index: ["fire"],
            desription: "Огонь"
        },
        {
            name: "wood",
            elemClass: 1,
            index: ["wood"],
            desription: "Дерево"
        },
        {
            name: "ground",
            elemClass: 1,
            index: ["ground"],
            desription: "Земля"
        },
        {
            name: "wind",
            elemClass: 1,
            index: ["wind"],
            desription: "Воздух"
        },
        {
            name: "mountain",
            elemClass: 1,
            index: ["mountain"],
            desription: "Гора"
        },
        {
            name: "seeds",
            elemClass: 2,
            index: ["water","wood"],
            desription: "Семена"
        },
        {
            name: "sand",
            elemClass: 2,
            index: ["stone","water"],
            desription: "Песок"
        },
        {
            name: "clay",
            elemClass: 2,
            index: ["ground", "water"],
            desription: "Глина"
        },
        {
            name: "saltpeter",
            elemClass: 2,
            index: ["ground", "wind"],
            desription: "Селитра"
        },
        {
            name: "bonfire",
            elemClass: 2,
            index: ["fire","stone"],
            desription: "Костер"
        },
        {
            name: "stone-instrument",
            elemClass: 2,
            index: ["stone","wood"],
            desription: "Кам.инстр-ты"
        },
        {
            name: "steam",
            elemClass: 2,
            index: ["fire","water"], 
            desription: "Пар"
        },
        {
            name: "coal",
            elemClass: 2,
            index: ["fire","wood"],
            desription: "Уголь"
        },
        {
            name: "wood-house",
            elemClass: 3,
            index: ["stone-instrument","wood"],
            desription: "Деревянный дом"
        },
        {
            name: "fertilizers",
            elemClass: 3,
            index: ["ground","saltpeter"],
            desription: "Удобрения"
        },
        {
            name: "powder",
            elemClass: 3,
            index: ["coal","saltpeter"],
            desription: "Порох"
        },
        {
            name: "bugle",
            elemClass: 3,
            index: ["bonfire","wind"],
            desription: "Печь"
        },
        {
            name: "metal",
            elemClass: 3,
            index: ["stone-instrument","mountain"],
            desription: "Металл"
        },
        {
            name: "glass",
            elemClass: 3,
            index: ["fire","sand"],
            desription: "Стекло"
        },
        {
            name: "brick",
            elemClass: 3,
            index: ["bugle","clay"],
            desription: "Кирпич"
        }
    ];

    swapClass() {
        let arr = this.classes;
        arr.forEach(item => item.addEventListener('click', () => {
            let index = item.dataset.toggle;
            let target = this.elements[index - 1];
            for (let i = 0; i < this.elements.length; i++) {
                if (target !== this.elements[i]) {
                    this.elements[i].style.display = "none";
                    target.style.display = "flex";
                } else {
                    target.style.display = "flex";
                }
            }
        }));
    }

    dragNdrop() {
        const arr = this.elements;
        arr.forEach(item => {
            const childrens = item.children;
            for (let child of childrens) {
                let parent = child.parentNode;
                child.onmousedown = function (event) {
                    let clone = child.cloneNode(true);
                    
                    clone.style.position = 'absolute';
                    clone.style.zIndex = 1000;
                    
                    document.body.append(clone);

                    moveAt(event.pageX, event.pageY);

                    function moveAt(pageX, pageY) {
                        clone.style.left = pageX - clone.offsetWidth / 2 + 'px';
                        clone.style.top = pageY - clone.offsetHeight / 2 + 'px';
                    }

                    function onMouseMove(event) {
                        moveAt(event.pageX, event.pageY);
                    }

                    document.addEventListener('mousemove', onMouseMove);

                    child.onmouseup = function () {
                        document.removeEventListener('mousemove', onMouseMove);
                        child.onmouseup = null;
                        clone.onmouseup = null;
                    };
                };
                child.ondragstart = function () {
                    return false;
                };
            }
        });
    }

    createdElements = ["water", "fire", "stone", "wood", "ground", "wind", "mountain"];

    checkElements(...elems) {

    }

    createElement(info) {
        let {name, elemClass, index, description} = info;
        let parent = document.querySelector(`.elements[data-index] = ${elemClass}`);
        let check = this.createdElements.indexOf(name);
        if (check) {
            this.createdElements.push(name);
            parent.insertAdjacentHTML('beforeend', `<div class="${name}"><img src="img/${name}.svg" alt=""><div>${description}</div></div>`);
        } else {
            return false;
        }
    }
}

const manager = new GameManager(elements, classes);
manager.swapClass();
manager.dragNdrop();


