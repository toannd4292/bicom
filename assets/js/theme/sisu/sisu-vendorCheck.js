export default function handleVendorCheck() {
    const $refs = $('#approvalMessage');
    if (!$refs.length) return;
    if (document.referrer) {
        // const refList = ['http://skiss.nu/', 'http://skiss.nu', 'https://sisuguard.eu/', 'https://sisuguard.eu', 'https://hfsport.se/', 'https://hfsport.se', 'https://www.hfsport.se/', 'https://www.hfsport.se'];
        const refList = ['sisuguard.eu', 'hfsport.se', 'sisuprotetorbucal.com.br'];
        const httpRefList = ['skiss.nu'];
        const www = 'www.';
        const https = 'https://';
        const http = 'http://';
        const afterSlash = '/';
        const ref = document.referrer;
        const url = document.getElementById('url');
        // const approvalMessage = document.getElementById('approvalMessage');
        const urlMessage = document.getElementById('urlMessage');
        const newApprovalMessage = document.getElementById('newApprovalMessage');
        const goBackUrl = document.getElementById('goBackUrl');
        const shortUrl = ref.replace(/(^\w+:|^)\/\//, '');
        const buttonCheck = document.getElementsByClassName('urlCheckButton')[0];
        let approved = false;
        const refListTransformed = [];
        refList.forEach((e) => {
            refListTransformed.push(https + www + e);
            refListTransformed.push(https + e);
            refListTransformed.push(https + www + e + afterSlash);
            refListTransformed.push(https + e + afterSlash);
        });
        httpRefList.forEach((e) => {
            refListTransformed.push(http + www + e);
            refListTransformed.push(http + e);
            refListTransformed.push(http + www + e + afterSlash);
            refListTransformed.push(http + e + afterSlash);
        });
        // console.log(ref);
        // console.log(refListTransformed);
        if (refListTransformed.includes(ref)) {
            approved = true;
        } else {
            approved = false;
        }
        if (approved) {
            url.textContent = ref;
            url.style.color = 'green';
            urlMessage.style.display = 'none';
            newApprovalMessage.textContent = 'You can feel confident in purchasing from this seller.';
            goBackUrl.textContent = shortUrl;
        } else {
            url.textContent = ref;
            newApprovalMessage.textContent = 'We can not guarantee your purchase will be valid from this reseller.';
            buttonCheck.textContent = 'See list of verified resellers';
            buttonCheck.onclick = () => { window.location.href = 'https://www.sisuguard.com/international-distributors/'; };
        }
    } else {
        // console.log(document.referrer);
        const approvalMessage = document.getElementById('approvalMessage');
        // const urlMessage = document.getElementById("urlMessage");
        const newApprovalMessage = document.getElementById('newApprovalMessage');
        // const goBackUrl = document.getElementById("goBackUrl");
        const buttonCheck = document.getElementsByClassName('urlCheckButton')[0];
        approvalMessage.style.display = 'none';
        newApprovalMessage.textContent = "You must visit this page from an outside link to verify it's authenticity.";
        buttonCheck.innerHTML = 'GO BACK';
    }
}
