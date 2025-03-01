export function getGradient(element, colorOne, colorTwo, direction) {
    const firstColor = {
        r: colorOne[0],
        g: colorOne[1],
        b: colorOne[2]
    };

    const secondColor = {
        r: colorTwo[0],
        g: colorTwo[1],
        b: colorTwo[2]
    };

    const gradientStopOne = [
        { pct: 0,  color: { r: 18, g: 18, b: 18 } }, // The first color in your gradient
        { pct: 100, color: {r: 18, g: 18, b: 18 } }   // The color you want your first color to transition to
    ];
    const gradientStopTwo = [
        { pct: 0,  color: { r: firstColor.r, g: firstColor.g, b: firstColor.b } }, // The second color in your gradient
        { pct: 100, color: { r: secondColor.r, g: secondColor.g, b: secondColor.b } }  // The color you want your second color to transition to
    ];

    animateGradient(element, gradientStopOne, gradientStopTwo, direction);
}

// This function transitions between two rgb colors
const getColor = function(pct, colorSet) {
    for (var i = 1; i < colorSet.length - 1; i++) {
        if (pct < colorSet[i].pct) {
            break;
        }
    }
    // This conversion figures out the transition between two rgb values
    var lower = colorSet[i - 1];
    var upper = colorSet[i];
    var range = upper.pct - lower.pct;
    var rangePct = (pct - lower.pct) / range;
    var pctLower = 1 - rangePct;
    var pctUpper = rangePct;
    var color = {
        r: Math.floor(lower.color.r * pctLower + upper.color.r * pctUpper),
        g: Math.floor(lower.color.g * pctLower + upper.color.g * pctUpper),
        b: Math.floor(lower.color.b * pctLower + upper.color.b * pctUpper)
    };
    // And returns the rgb code
    return `rgb(${color.r}, ${color.g}, ${color.b})`;
}

const animateGradient = function(element, gradientStopOne, gradientStopTwo, direction) {
    let transitionTime = 1000           // <-- 100 ms - time our animation will last
    let angle = -45;                    // <-- angle of gradient
    let animationDirection = direction; // <-- stores the animation direction
    let intervalFrame;                  // <-- stores the interval frame
    let currentPct = 0;                 // <-- current percentage through the animation
    let elapsed = 0;                    // <-- number of frames which have ellapsed 
    
    if(intervalFrame === undefined) {
        intervalFrame = setInterval(() => {
            let time = transitionTime / 1000; // time in seconds
            let numberOfFrames = time * 60; // 60 frames per second -> 1 second = 60 frames

            // If the animation is going forward
            if(animationDirection === 'forwards') {
                // Add 1 to elapsed
                elapsed += 1;
                // The elapsed frames out of max frames
                currentPct = Math.min(elapsed / numberOfFrames, 1) * 100;
            }
            else {
                // Otherwise we're going back - subtract 1 from ellapsed
                elapsed -= 1;
                // The elapsed frames out of max frames
                currentPct = Math.max(elapsed / numberOfFrames, 0) * 100;
            }

            // Calculate current color in this time for each gradient color
            let colorOne = getColor(currentPct, gradientStopOne);
            let colorTwo = getColor(currentPct, gradientStopTwo);

            // Generate CSS string
            let generateGradient = `linear-gradient(${angle}deg, ${colorOne}, ${colorTwo})`;

            // Add it to our background.
            document.getElementById(element).style.backgroundImage = generateGradient;

            // End the interval when we're done
            if(currentPct === 100 || currentPct === 0) {
                clearInterval(intervalFrame);
                intervalFrame = undefined;
            }
        }, 16.667); // 60 frames per second
    }
};