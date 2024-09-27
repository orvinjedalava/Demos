document.getElementById('toggleButton').addEventListener('click', function() {
    var drawer = document.getElementById('sideDrawer');
    if (drawer.style.left === '-250px') {
        drawer.style.left = '0';
    } else {
        drawer.style.left = '-250px';
    }
});
