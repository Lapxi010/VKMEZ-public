function initDropzone(dropzoneId, fileInputId, fileListId) {
    var dropzone = document.getElementById(dropzoneId);
    var fileInput = document.getElementById(fileInputId);
    var fileList = document.getElementById(fileListId);
    if (!dropzone || !fileInput || !fileList) return;

    var allFiles = [];

    dropzone.addEventListener('click', function(e) {
        if (!e.target.closest('.remove-btn')) {
            fileInput.click();
        }
    });

    dropzone.addEventListener('dragover', function(e) {
        e.preventDefault();
        dropzone.classList.add('dropzone--active');
    });

    ['dragleave', 'drop'].forEach(function(eventName) {
        dropzone.addEventListener(eventName, function(e) {
            if (eventName === 'drop' || !dropzone.contains(e.relatedTarget)) {
                dropzone.classList.remove('dropzone--active');
            }
        });
    });

    dropzone.addEventListener('drop', function(e) {
        e.preventDefault();
        handleFiles(e.dataTransfer.files);
    });

    fileInput.addEventListener('change', function() {
        handleFiles(fileInput.files);
        fileInput.value = '';
    });

    function handleFiles(files) {
        if (!files || files.length === 0) return;
        Array.from(files).forEach(function(file) {
            if (!allFiles.some(f => f.name === file.name)) {
                allFiles.push(file);
            }
        });
        updateInputAndRender();
    }

    function removeFile(index) {
        allFiles.splice(index, 1);
        updateInputAndRender();
    }

    function updateInputAndRender() {
        var dataTransfer = new DataTransfer();
        allFiles.forEach(function(file) { dataTransfer.items.add(file); });
        fileInput.files = dataTransfer.files;
        renderFiles();
    }

    function renderFiles() {
        fileList.innerHTML = '';
        allFiles.forEach(function(file, index) {
            var item = document.createElement('div');
            item.className = 'dropzone__file-item';
            item.style.cssText = 'display:flex;justify-content:space-between;align-items:center;margin-bottom:5px;';
            item.innerHTML = `
                <div style="display:flex;align-items:center;gap:8px;overflow:hidden;">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                        <polyline points="14 2 14 8 20 8"/>
                    </svg>
                    <span style="white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">${file.name}</span>
                </div>
                <div class="remove-btn" style="cursor:pointer;padding:5px;color:white;font-weight:bold;">&#x2715;</div>
            `;
            item.querySelector('.remove-btn').addEventListener('click', function(e) {
                e.stopPropagation();
                removeFile(index);
            });
            fileList.appendChild(item);
        });
    }
}

document.addEventListener('DOMContentLoaded', function() {
    initDropzone('feedbackDropzone', 'feedbackFileInput', 'feedbackFileList');
    initDropzone('warrantyDropzone', 'warrantyFileInput', 'warrantyFileList');
});
