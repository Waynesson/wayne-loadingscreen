var count = 0;
var thisCount = 0;

async function updateServerInfo() {
    try {
        const response = await fetch('https://servers-frontend.fivem.net/api/servers/single/4i6jf93'); //Replace 4i6jf93 with your correct server join code
        const data = await response.json();
        
        if (data && data.Data) {
            const clients = data.Data.clients;
            const maxClients = data.Data.sv_maxclients;
            
            document.querySelector('.status-value').innerHTML = `${clients}/${maxClients}`;
        }
    } catch (error) {
        console.log('Error fetching server info:', error);
        document.querySelector('.status-value').innerHTML = 'Fetching...';
    }
}

updateServerInfo();
setInterval(updateServerInfo, 5000);

const handlers = {
    startInitFunctionOrder(data) {
        count = data.count;
        document.querySelector('.loading-text').innerHTML = 'Loading Resources';
    },

    initFunctionInvoking(data) {
        document.querySelector('.progressBar').style.left = '0%';
        document.querySelector('.progressBar').style.width = ((data.idx / count) * 100) + '%';
        document.querySelector('.loading-percentage').innerHTML = Math.round((data.idx / count) * 100) + '%';
        document.querySelector('.loading-text').innerHTML = 'Loading: ' + data.name;
    },

    startDataFileEntries(data) {
        count = data.count;
        document.querySelector('.loading-text').innerHTML = 'Loading Game Files';
    },

    performMapLoadFunction(data) {
        ++thisCount;
        document.querySelector('.progressBar').style.left = '0%';
        document.querySelector('.progressBar').style.width = ((thisCount / count) * 100) + '%';
        document.querySelector('.loading-percentage').innerHTML = Math.round((thisCount / count) * 100) + '%';
    },
};

var play = false;
var myAudio = document.getElementById("leson");
myAudio.volume = 0.1;

function onKeyDown(event) {
    switch (event.keyCode) {
        case 32:
            if (play) {
                myAudio.pause();
                play = false;
            } else {
                myAudio.play();
                play = true;
            }
            break;
        case 72:
            const blackScreen = document.getElementById('black-screen');
            if (blackScreen.classList.contains('hidden')) {
                blackScreen.classList.remove('hidden');
                blackScreen.style.display = 'block';
            } else {
                blackScreen.classList.add('hidden');
                blackScreen.style.display = 'none';
            }
            break;
    }
    return false;
}

const gta_div = document.getElementById("fiv");
if (gta_div) {
    gta_div.style.display = 'none';
}

window.addEventListener("keydown", onKeyDown, false);

window.addEventListener('message', function (e) {
    (handlers[e.data.eventName] || function () { })(e.data);
});

const style = document.createElement('style');
style.textContent = `
    .gta-loader {
        display: none !important;
    }
    #fiv {
        display: none !important;
    }
    .letni {
        display: none !important;
    }
`;
document.head.appendChild(style);