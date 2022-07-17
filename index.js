// import the robotjs library
var robot = require('robotjs');

function main() {
    console.log("Starting...");
    sleep(4000);

   // infinite loop
    while (true) {
        var tree = findTree();
        if (tree == false) {
            rotateCamera();
            continue;

        }
        // chop down tree we found
        robot.moveMouse(tree.x, tree.y);
        robot.mouseClick();
        sleep(3000);

        dropLogs();        

    }
}

function dropLogs() {
        var drop_x = 1736;
        var drop_y = 775;
        var log_color = "634c2c";
        var log_color2 ="8e6e42";
        

        var pixel_color = robot.getPixelColor(drop_x, drop_y);
        // console.log("log color is: " + pixel_color);
        
        var wait_cycles = 5;
        var max_wait_cycles = 9;
        while (pixel_color != log_color && wait_cycles < max_wait_cycles) {
            // waiting for chopping
            sleep(1000);
            // sample the pixel color after waiting
            pixel_color = robot.getPixelColor(drop_x, drop_y);
            // increment our country
            wait_cycles++;

        }

        // drop logs from inventory if the color matches
        if (pixel_color == log_color, log_color2) {
        robot.moveMouse(drop_x, drop_y);
        robot.mouseClick('right');
        sleep(300);
        robot.moveMouse(drop_x, drop_y + 50);
        robot.mouseClick();
        sleep(1000);
    }

}
// grabs area of screen
function testScreenCapture() {
    var img = robot.screen.capture(0, 0, 1920, 1080);

    var pixel_color = img.colorAt(30, 18);
    console.log(pixel_color);
}

function findTree() {
    var x = 300, y = 300, width = 1000, height = 1000;
    var img = robot.screen.capture(x, y, width, height);

    var tree_colors = ["392c1a", "7d6039", "7a5d39", "917143", "573928", "947243", "7d6039", "83643c"]
    
    for (var i = 0; i < 1000; i++) {
        var random_x = getRandomInt(0, width-1);
        var random_y = getRandomInt(0, height-1);
        var sample_color = img.colorAt(random_x, random_y);

        if (tree_colors.includes(sample_color)) {
            var screen_x = random_x + x;
            var screen_y = random_y + y; 
            

            if (confirmTree(screen_x, screen_y)) {}
                console.log("Found a tree at: " + screen_x + ", " + screen_y + " color " + sample_color)
                return {x: screen_x, y: screen_y};
            } else {
              console.log("Tree Not Found: " + screen_x + ", " + screen_y + " color " + sample_color)
            }

    }
    // did not find the color in screen shot
    return false;
}
// if tree is not found, rotates to find 
function rotateCamera() {
    console.log("Rotating camera");
    robot.keyToggle('right', 'down');
    sleep(1000);
    robot.keyToggle('right', 'up');
}

function confirmTree(screen_x, screen_y) {
    // move mouse to coordinates/tree 
    robot.moveMouse(screen_x, screen_y)
    // wait a moment for the text to appear
    sleep(300);

    // check color of action text
    var check_x = 85;
    var check_y = 34;
    var pixel_color = robot.getPixelColor(check_x, check_y);

    return (pixel_color == "00ffff");
}

function sleep(ms) {
    Atomics.wait(new Int32Array(new SharedArrayBuffer(4)), 0, 0, ms);
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}


main();
