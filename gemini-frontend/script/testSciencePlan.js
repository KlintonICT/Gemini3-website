(() => {
    let conflicted = [], pending = [], tested = [];

    const modifyConflict = () => {
        conflicted.forEach(elem => {
            $(`#conflictModify${elem.sciencePlanId}`).on('click', () => {
                $('#link-to-modify').html(`<a href="./modifySciencePlan.html" id="modifySciencePlan"></a>`)
                location.href = $('#modifySciencePlan').attr('href');
                var modifyPlan = elem;
                modifyPlan.status = 'conflict';
                localStorage.setItem('modifyPlan', JSON.stringify(modifyPlan));
            })
        })
    }

    const modifyPending = () => {
        pending.forEach(elem => {
            $(`#pendingModify${elem.sciencePlanId}`).on('click', () => {
                $('#link-to-modify').html(`<a href="./modifySciencePlan.html" id="modifySciencePlan"></a>`)
                location.href = $('#modifySciencePlan').attr('href');
                var modifyPlan = elem;
                modifyPlan.status = 'pending';
                localStorage.setItem('modifyPlan', JSON.stringify(modifyPlan));
            })
        })
    }

    const modifyTested = () => {
        tested.forEach(elem => {
            $(`#testedModify${elem.sciencePlanId}`).on('click', () => {
                $('#link-to-modify').html(`<a href="./modifySciencePlan.html" id="modifySciencePlan"></a>`)
                location.href = $('#modifySciencePlan').attr('href');
                var modifyPlan = elem;
                modifyPlan.status = 'tested';
                localStorage.setItem('modifyPlan', JSON.stringify(modifyPlan));
            })
        })
    }

    const rejectSciencePlan = () => {
        conflicted.forEach(elem => {
            $(`#reject${elem.sciencePlanId}`).on('click', () => {
                const conflictIndex = conflicted.findIndex(con => con.sciencePlanId === elem.sciencePlanId);
                conflicted.splice(conflictIndex, 1);
                $(`#conflict${elem.sciencePlanId}`).remove();
                if(conflicted.length <= 0){
                    $('#conflict-block').remove();
                }
                emptyTests();
            })
        })
    }

    const testingSciencePlan = () => {
        pending.forEach(elem => {
            $(`#test${elem.sciencePlanId}`).on('click', () => {
                $('#modal-testing').modal({
                    escapeClose: false,
                    clickClose: false,
                    showClose: false,
                });
                setTimeout(() => {
                    $.modal.close();
                    const pendingIndex = pending.findIndex(pend => pend.sciencePlanId === elem.sciencePlanId);
                    pending.splice(pendingIndex, 1);
                    $(`#pending${elem.sciencePlanId}`).remove();
                    if(pending.length <= 0){
                        $('#pending-block').remove();
                    }
                    if(tested.length <= 0){
                        document.getElementById('tested-block').style.display = 'block'; 
                    }
                    const testedBox = document.getElementById('tested-box');
                    const temp = createTestedElem(elem);
                    testedBox.appendChild( temp );
                    tested.push( elem );
                    modifyTested();
                    sciencePlanModal( elem );
                }, 3000);
            })
        })
    }

    const submitSciencePlan = ( elem ) => {
        const buttonWrapper = document.getElementById('button-wrapper');
        const submitBtn = document.createElement('span');
        submitBtn.setAttribute('class', 'submitSciencePlanBtn');
        submitBtn.setAttribute('id', `submitBtn${elem.sciencePlanId}`);
        submitBtn.innerHTML = 'Submit';
        buttonWrapper.appendChild(submitBtn);
        $(`#submitBtn${elem.sciencePlanId}`).on('click', () => {
            $.modal.close();
            $(`#submitBtn${elem.sciencePlanId}`).remove();
            $(`#tested${elem.sciencePlanId}`).remove();
            const testedIndex = tested.findIndex(test => test.sciencePlanId === elem.sciencePlanId);
            tested.splice(testedIndex, 1);
            if(tested.length <= 0){
                document.getElementById('tested-block').style.display = 'none';
            }
            emptyTests();
        })
        $('#cancel').on('click', () => { 
            $.modal.close(); 
            $(`#submitBtn${elem.sciencePlanId}`).remove();
        })
    }

    const sciencePlanModal = ( elem ) => { 
        $(`#submit${elem.sciencePlanId}`).on('click', () => {
            $('#modal-submit').modal({
                escapeClose: false,
                clickClose: false,
                showClose: false
            });
            document.getElementById('sciencePlanName').innerHTML = elem.sciencePlanName;
            document.getElementById('sciencePlanId').innerHTML = `No. ${elem.sciencePlanId}`;
            document.getElementById('collaborator').innerHTML = elem.collaborator;
            document.getElementById('creator').innerHTML = elem.creator;
            document.getElementById('objective').innerHTML = elem.objective;
            document.getElementById('fund').innerHTML = `${elem.fund} $`;
            document.getElementById('scheduleStart').innerHTML = elem.scheduleStart;
            document.getElementById('scheduleStop').innerHTML = elem.scheduleStop;
            document.getElementById('starSystemId').innerHTML = elem.starSystemId;
            document.getElementById('starName').innerHTML = elem.starName;
            document.getElementById('telescopeLocation').innerHTML = elem.telescopeLocation;
            document.getElementById('description').innerHTML = elem.description;
            document.getElementById('fileType').innerHTML = elem.fileType;
            document.getElementById('fileQuality').innerHTML = elem.fileQuality;
            document.getElementById('colorType').innerHTML = elem.colorType;
            document.getElementById('color').innerHTML = elem.color;
            document.getElementById('contrast').innerHTML = elem.contrast;
            document.getElementById('brightness').innerHTML = elem.brightness;
            document.getElementById('saturation').innerHTML = elem.saturation;
            
            submitSciencePlan( elem );
        })
    }

    const submitSciencePlanModal = () => {
        tested.forEach(elem => {
            sciencePlanModal( elem );
        })
    }

    const createConflictElem = ( elem ) => {
        const conflictContent = document.createElement('div');
        const number = document.createElement('span');
        const title = document.createElement('div');
        const buttonWrapper= document.createElement('div');
        const modify = document.createElement('span');
        const reject = document.createElement('span');
        
        conflictContent.setAttribute('class', 'conflict-content');
        conflictContent.setAttribute('id', `conflict${elem.sciencePlanId}`);
        number.setAttribute('class', 'no');
        title.setAttribute('class', 'title');
        buttonWrapper.setAttribute('class', 'conflict-button-wrapper');
        modify.setAttribute('class', 'modify');
        modify.setAttribute('id', `conflictModify${elem.sciencePlanId}`);
        reject.setAttribute('class', 'reject');
        reject.setAttribute('id', `reject${elem.sciencePlanId}`);

        number.innerHTML = `No. ${elem.sciencePlanId}`;
        title.innerHTML = `${elem.sciencePlanName}`;
        modify.innerHTML = 'Modify';
        reject.innerHTML = 'Reject';

        buttonWrapper.appendChild(modify);
        buttonWrapper.appendChild(reject);
        conflictContent.appendChild(number);
        conflictContent.appendChild(title);
        conflictContent.appendChild(buttonWrapper);

        return conflictContent;
    }

    const createPendingElem = ( elem ) => { 
        const pendingContent = document.createElement('div');
        const number = document.createElement('span');
        const title = document.createElement('div');
        const buttonWrapper= document.createElement('div');
        const modify = document.createElement('span');
        const test = document.createElement('span');
        
        pendingContent.setAttribute('class', 'pending-content');
        pendingContent.setAttribute('id', `pending${elem.sciencePlanId}`);
        number.setAttribute('class', 'no');
        title.setAttribute('class', 'title');
        buttonWrapper.setAttribute('class', 'pending-button-wrapper');
        modify.setAttribute('class', 'modify');
        modify.setAttribute('id', `pendingModify${elem.sciencePlanId}`);
        test.setAttribute('class', 'test');
        test.setAttribute('id', `test${elem.sciencePlanId}`);

        number.innerHTML = `No. ${elem.sciencePlanId}`;
        title.innerHTML = `${elem.sciencePlanName}`;
        modify.innerHTML = 'Modify';
        test.innerHTML = 'Test>';

        buttonWrapper.appendChild(modify);
        buttonWrapper.appendChild(test);
        pendingContent.appendChild(number);
        pendingContent.appendChild(title);
        pendingContent.appendChild(buttonWrapper);

        return pendingContent;
    }

    const createTestedElem = ( elem ) => { 
        const testedContent = document.createElement('div');
        const number = document.createElement('span');
        const title = document.createElement('div');
        const buttonWrapper= document.createElement('div');
        const modify = document.createElement('span');
        const submit = document.createElement('span');
        
        testedContent.setAttribute('class', 'tested-content');
        testedContent.setAttribute('id', `tested${elem.sciencePlanId}`);
        number.setAttribute('class', 'no');
        title.setAttribute('class', 'title');
        buttonWrapper.setAttribute('class', 'tested-button-wrapper');
        modify.setAttribute('class', 'modify');
        modify.setAttribute('id', `testedModify${elem.sciencePlanId}`);
        submit.setAttribute('class', 'submit');
        submit.setAttribute('id', `submit${elem.sciencePlanId}`);

        number.innerHTML = `No. ${elem.sciencePlanId}`;
        title.innerHTML = `${elem.sciencePlanName}`;
        modify.innerHTML = 'Modify';
        submit.innerHTML = 'Submit';

        buttonWrapper.appendChild(modify);
        buttonWrapper.appendChild(submit);
        testedContent.appendChild(number);
        testedContent.appendChild(title);
        testedContent.appendChild(buttonWrapper);

        return testedContent;
    }
    
    const displayConflict = () => {
        const conflictBlock =  document.getElementById('conflict-block');
        const title = document.createElement('span');
        const box = document.createElement('div');
        
        title.setAttribute('class', 'block-title');
        title.setAttribute('style', 'color: red;');
        title.innerHTML = 'Conflicted Schedule';
        box.setAttribute('class', 'conflict-box');

        if( conflicted.length > 0){
            conflictBlock.setAttribute('class', 'conflict-block');
            conflictBlock.appendChild(title);
            conflicted.forEach(elem => {
                const temp = createConflictElem(elem);
                box.appendChild(temp);
            })
            conflictBlock.appendChild(box);
        }
    }

    const displayPending = () => {
        const pendingBlock =  document.getElementById('pending-block');
        const title = document.createElement('span');
        const box = document.createElement('div');
        
        title.setAttribute('class', 'block-title');
        title.setAttribute('style', 'color: white;');
        title.innerHTML = 'Pending Plan';
        box.setAttribute('class', 'pending-box');

        if( pending.length > 0){
            pendingBlock.setAttribute('class', 'pending-block');
            pendingBlock.appendChild(title);
            pending.forEach(elem => {
                const temp = createPendingElem(elem);
                box.appendChild(temp);
            })
            pendingBlock.appendChild(box);
        }
    }

    const displayTested = () => {
        const testedBlock =  document.getElementById('tested-block');
        const title = document.createElement('span');
        const box = document.createElement('div');
        
        title.setAttribute('class', 'block-title');
        title.setAttribute('style', 'color: #05FF00;');
        title.innerHTML = 'Tested Plan';
        box.setAttribute('class', 'tested-box');
        box.setAttribute('id', 'tested-box');

        if( tested.length > 0){
            testedBlock.setAttribute('class', 'tested-block');
            testedBlock.appendChild(title);
            tested.forEach(elem => {
                const temp = createTestedElem(elem);
                box.appendChild(temp);
            })
            testedBlock.appendChild(box);
        }
    }

    const emptyTests = () => {
        if( conflicted.length <= 0 && pending.length <= 0 && tested.length <= 0){
            const empty = document.getElementById('empty-tests-plan');
            empty.setAttribute('class', 'empty-tests-plan');
            empty.innerHTML = 'There is no science plan available here ...';
        }
        if((conflicted.length + pending.length + tested.length <= 0) < 5){
            document.getElementsByTagName('BODY')[0].style.height = '100vh';
        }
    }

    const run = async () => {
        var currentUser = localStorage.getItem('currentUser');
        currentUser = currentUser ? JSON.parse(currentUser) : {};
        document.getElementById('loginName').innerHTML = currentUser.username;

        conflicted = await conflictedSchedule();
        pending = await pendingPlan();
        tested = await testedPlan();

        displayConflict();
        displayPending();
        displayTested();
        rejectSciencePlan();
        testingSciencePlan();
        modifyConflict();
        modifyPending();
        modifyTested();
        emptyTests();
        submitSciencePlanModal();
    }
    run();
})();