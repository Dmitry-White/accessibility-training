(function () {
    const tabs = document.querySelectorAll('[role="tab"]');
    const panels = document.querySelectorAll('[role="tabpanel"]');

    const keys = {
        enter: 13,
        space: 32,
        end: 35,
        home: 36,
        left: 37,
        right: 39,
    };

    const resetTabs = tabs => {
        tabs.forEach(tab => {
            tab.setAttribute('tabindex', '-1');
            tab.setAttribute('aria-selected', 'false');
        });

        panels.forEach(panel => panel.setAttribute('hidden', 'hidden'));
    };

    const focusTab = event => {
        const tab = event.target.closest('[aria-controls]');
        const controls = tab.getAttribute('aria-controls');

        resetTabs(tabs);

        tab.removeAttribute('tabindex');

        tab.setAttribute('aria-selected', 'true');

        document.getElementById(controls).removeAttribute('hidden');

        tab.focus();
    };

    const focusTabFirst = tabs => tabs[0].focus();

    const focusTabLast = tabs => tabs[tabs.length - 1].focus();

    const arrowPressHandler = event => {
        const key = event.keyCode;
        const tab = event.target;

        let direction;

        if (key === 37) direction = -1;
        else if (key === 39) direction = 1;

        if (direction && (tab.i !== undefined)) {
            if (tabs[tab.i + direction]) tabs[tab.i + direction].focus();
            else if (key === keys.right) focusTabFirst(tabs);
            else if (key === keys.left) focusTabLast(tabs);
        }
    }

    const clickHandler = event => focusTab(event);

    const keydownHandler = event => {
        const key = event.keyCode;

        switch (key) {
            case keys.end:
                event.preventDefault();
                focusTabLast(tabs);
                break;
            case keys.home:
                event.preventDefault();
                focusTabFirst(tabs);
                break;
        }
    }

    const keyupHandler = event => {
        const key = event.keyCode;

        switch (key) {
            case keys.left:
            case keys.right:
                arrowPressHandler(event);
                break;
            case keys.enter:
            case keys.space:
                focusTab(event);
                break;
        }
    }

    for (let i = 0; i < tabs.length; ++i) {
        tabs[i].addEventListener('click', clickHandler);
        tabs[i].addEventListener('keydown', keydownHandler);
        tabs[i].addEventListener('keyup', keyupHandler);

        tabs[i].i = i;
    }
}());