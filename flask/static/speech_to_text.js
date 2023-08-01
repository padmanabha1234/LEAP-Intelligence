        let stream;
        let mediaRecorder;
        let chunks = [];
        let sourceLanguage = 'en';
        let recordingInProgress = false;
        let recognition = "can you select machine, shift and parameter";
        let voice;

        const startButton = document.getElementById('startButton');
        const stopButton = document.getElementById('stopButton');
        const audioOutput = document.getElementById('audioOutput');

        const langSelect = document.getElementById('langSelect');

        langSelect.addEventListener('change', () => {
  sourceLanguage = langSelect.value;
  target_lang_for_audio = langSelect.value;
  if (chunks.length > 0) {
    const audioBlob = new Blob(chunks, { type: 'audio/mpeg; codecs=opus' });
    chunks = [];
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result.split(',')[1];
      fetchASRResult(base64String);
    };
    reader.readAsDataURL(audioBlob);
  }
});


        const handleSuccess = (stream) => {
            window.stream = stream;
            mediaRecorder = new MediaRecorder(stream);

            mediaRecorder.ondataavailable = (e) => {
                chunks.push(e.data);
            };

            mediaRecorder.onstop = () => {
                const audioBlob = new Blob(chunks, { type: 'audio/mpeg; codecs=opus' });
                chunks = [];

                const reader = new FileReader();
                reader.onloadend = () => {
                    const base64String = reader.result.split(',')[1];
                    const audioElement = document.createElement('audio');
                    audioElement.src = 'data:audio/mpeg;base64,' + base64String;
                    audioElement.controls = true;
                    audioOutput.innerHTML = '';
                    // audioOutput.appendChild(audioElement);

                    // Call the function to fetch ASR result and display it
                    fetchASRResult(base64String);
                };

                reader.readAsDataURL(audioBlob);
            };
        };


startButton.addEventListener('click', async () => {
  if (!recordingInProgress) {
    // Start recording
    stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    recordingInProgress = true;

    mediaRecorder = new MediaRecorder(stream);
    mediaRecorder.ondataavailable = (e) => {
      chunks.push(e.data);
    };
    mediaRecorder.onstop = () => {
      const audioBlob = new Blob(chunks, { type: 'audio/mpeg; codecs=opus' });
      chunks = [];

      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result.split(',')[1];
        fetchASRResult(base64String);
      };

      reader.readAsDataURL(audioBlob);
    };

    mediaRecorder.start();
//    startButton.textContent = 'Stop Recording';
    startButton.style.backgroundColor = '#e74c3c';
    startButton.style.borderColor = '#c94f42';
    const microphoneIcon = startButton.querySelector('.microphone-icon');
    microphoneIcon.src = '/static/microphone_icon.png';

    // Automatically stop recording after 10 seconds
    setTimeout(() => {
      stopRecording();
    }, 5000); // 5 seconds in milliseconds
  }
});



function stopRecording() {
  if (recordingInProgress) {
    mediaRecorder.stop();
    stream.getTracks().forEach(track => track.stop());
    recordingInProgress = false;
        startButton.style.backgroundColor = '#0dab05';
    startButton.style.borderColor = '#2bc03c';
    const microphoneIcon = startButton.querySelector('.microphone-icon');
    microphoneIcon.src = '/static/mic.png';
  }
}


        async function fetchASRResult(base64Audio) {
            const url = 'https://dhruva-api.bhashini.gov.in/services/inference/pipeline';

            const compute_call_authorization_value = 'LJnB60OoLOll1nX_MpsGJdxLfAgoJAqWWA-d5n48g2O8rdQ3US3Klcrn9XM1ZfZG'
            const asr_service_id = 'ai4bharat/whisper-medium-en--gpu--t4';
            const target_language = 'en'
            const nmt_service_id = 'ai4bharat/indictrans-v2-all-gpu--t4'

            const requestBody = {
    pipelineTasks: [
        {
            taskType: 'asr',
            config: {
                language: {
                    sourceLanguage: sourceLanguage
                },
                serviceId: asr_service_id,
                audioFormat: 'flac',
                samplingRate: 16000
            }
        },
        {
            taskType: 'translation',
            config: {
                language: {
                    sourceLanguage: sourceLanguage,
                    targetLanguage: target_language
                },
                serviceId: nmt_service_id
            }
        }
    ],
    inputData: {
        audio: [
            {
                audioContent: base64Audio
            }
        ]
    }
};

            try {
                const response = await fetch(url, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': compute_call_authorization_value
                    },
                    body: JSON.stringify(requestBody)
                });

                const data = await response.json();
                displayResult(data);
            } catch (error) {
                displayError('Error occurred while fetching ASR result.');
                console.error(error);
            }
        }

        const machineKeywords = ['machine', 'select machine'];
const shiftKeywords = ['shift', 'select shift'];
const parameterKeywords = ['parameter', 'select parameter', 'parameters', 'select parameters'];
const submitKeywords = ['submit', 'submit form', 'submit data'];


function displayResult(data) {
//    const resultDiv = document.getElementById('result');
//    resultDiv.textContent = JSON.stringify(data, null, 2);

    // Get the ASR result text from the response data
    const asrResultSource = data?.pipelineResponse?.[0]?.output?.[0]?.source;
    const asrResultTarget = data?.pipelineResponse?.[1]?.output?.[0]?.target;

    // Check for keywords in both source and target ASR result texts and select the corresponding tab
    if (asrResultSource || asrResultTarget) {
        const tab1Keywords = ['threshold'];
        const tab2Keywords = ['correlation'];
        const tab3Keywords = ['trend analysis'];
        const tab4Keywords = ['forecast'];
        const alertKeywords = ['alert'];
        const connectKeywords = ['connect'];


        const lowercaseSource = asrResultSource?.toLowerCase() || '';
        const lowercaseTarget = asrResultTarget?.toLowerCase() || '';

        const combinedResult = lowercaseSource + ' ' + lowercaseTarget;
        console.log('Data is presented', combinedResult);

        if (tab1Keywords.some(keyword => combinedResult.includes(keyword))) {
            activateTab('manual');
            text = "Please Select the options";
            var utterance = new SpeechSynthesisUtterance(text);
            utterance.lang = "en-IN";
            window.speechSynthesis.speak(utterance);
        } else if (tab2Keywords.some(keyword => combinedResult.includes(keyword))) {
            activateTab('tab2');
            text = "Here are the details";
            var utterance = new SpeechSynthesisUtterance(text);
            utterance.lang = "en-IN";
            window.speechSynthesis.speak(utterance);
        } else if (tab3Keywords.some(keyword => combinedResult.includes(keyword))) {
            activateTab('tab3');
            text = "Please Select the options";
            var utterance = new SpeechSynthesisUtterance(text);
            utterance.lang = "en-IN";
            window.speechSynthesis.speak(utterance);
        } else if (tab4Keywords.some(keyword => combinedResult.includes(keyword))) {
            activateTab('tab4');
            text = "Please Select the options";
            var utterance = new SpeechSynthesisUtterance(text);
            utterance.lang = "en-IN";
            window.speechSynthesis.speak(utterance);
        } else if (alertKeywords.some(keyword => combinedResult.includes(keyword))) {
            activateTab('manual-alerts-button', true); // Activate "Manual Alerts" button
            text = "Ok";
            var utterance = new SpeechSynthesisUtterance(text);
            utterance.lang = "en-IN";
            window.speechSynthesis.speak(utterance);
        } else if (connectKeywords.some(keyword => combinedResult.includes(keyword))) {
            activateTab('manual-connect-btn', true); // Activate "Connect" button
            text = "Ok";
            var utterance = new SpeechSynthesisUtterance(text);
            utterance.lang = "en-IN";
            window.speechSynthesis.speak(utterance);
        }
    }
}
displayResult({});

function activateTab(target, isButton = false) {
    if (!isButton) {
        // Handle tab activation
        const tabElement = document.getElementById(target);
        if (tabElement) {
            // Deactivate all tabs
            const tabContents = document.querySelectorAll('.tab-pane');
            tabContents.forEach(tab => tab.classList.remove('show', 'active'));

            // Deactivate all tab labels and remove the red color highlight
            const tabLabels = document.querySelectorAll('.nav-link');
            tabLabels.forEach(label => {
                label.classList.remove('active');
                label.style.backgroundColor = ''; // Remove inline style
                label.style.color = ''; // Remove inline style for text color
            });

            // Activate the selected tab
            tabElement.classList.add('show', 'active');

            // Find the corresponding tab label and add the 'active' class with red color highlight
            const tabLabel = findTabLabelForTab(target);
            if (tabLabel) {
                tabLabel.classList.add('active');
                tabLabel.style.backgroundColor = 'red'; // Apply red color highlight
                tabLabel.style.color = 'white';
            }
        }
    } else {
        // Handle button activation
        const buttonElement = document.getElementById(target);
        if (buttonElement) {
            buttonElement.click(); // Simulate a click on the button
        }
    }
}


function findTabLabelForTab(tabId) {
    // Find the corresponding tab label (anchor) for the given tabId
    const tabLabels = document.querySelectorAll('.nav-link');
    for (const tabLabel of tabLabels) {
        if (tabLabel.getAttribute('href') === `#${tabId}`) {
            return tabLabel;
        }
    }
    return null; // Return null if the tab label is not found
}


        function displayError(errorMessage) {
            const resultDiv = document.getElementById('result');
            resultDiv.textContent = errorMessage;
        }

        function displayLog(message) {
    const logOutput = document.getElementById('logOutput');
    logOutput.textContent += message + '\n';
}

// Audio Content



