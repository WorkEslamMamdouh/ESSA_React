var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
$(document).ready(() => {
    AccountTree.InitalizeComponent();
});
var AccountTree;
(function (AccountTree) {
    var CompCode;
    var BranchCode;
    var sys = new SystemTools();
    var SysSession = GetSystemSession();
    var Tree_View;
    var Editing_Tab;
    var JournalList = new Array();
    var Details_ACCOUNT = new Array();
    var Details_GCodes = new Array();
    var DetGCod = new Array();
    var txtSearch;
    var AddMod = true;
    var Res = GetGlopelResources();
    CompCode = Number(SysSession.CurrentEnvironment.CompCode);
    BranchCode = Number(SysSession.CurrentEnvironment.BranchCode);
    let Glopal_parentAcc;
    let Glopal_PageNum;
    let Glopal_SearchValue = '';
    let Glopal_IDAccClick = '';
    // ---- حالة البحث ----
    let currentKeyword = '';
    let searchQueue = [];
    let visited = new Set(); // لتجنب إعادة فحص نفس li
    // --------------------------------
    const PageSize = 6;
    function InitalizeComponent() {
        InitalizeControls();
        InitializeEvents();
        enableClickHighlight(); // ← أضف هذا السطر
        loadChildren(1, null);
        Close_Loder();
    }
    AccountTree.InitalizeComponent = InitalizeComponent;
    function InitalizeControls() { }
    function InitializeEvents() {
        $('#btnSearch').on('click', () => {
            Search();
        });
        Event_key('Enter', 'txtSearch', 'btnSearch');
    }
    function Search() {
        var _a;
        const kw = (_a = $('#txtSearch').val()) === null || _a === void 0 ? void 0 : _a.trim();
        // لو المستخدم فضّى البحث
        if (!kw) {
            currentKeyword = ''; // ✨ Reset
            visited.clear(); // ✨ Reset
            searchQueue = []; // ✨ Reset
            $('.highlight').removeClass('highlight');
            return;
        }
        // لو الكلمة جديدة أو حتى نفس القديمة بعد ما فضينا البحث
        if (kw.toLowerCase() !== currentKeyword) {
            currentKeyword = kw.toLowerCase();
            visited.clear(); // ✨ Reset
            searchQueue = []; // ✨ Reset
            const root = document.getElementById('1-null');
            if (!root) {
                ShowMessage('Tree root not found (id="1-null")', 'لم يتم العثور على جذر الشجرة (id="1-null")');
                return;
            }
            searchQueue.push({ container: root, index: 0 });
            document.querySelectorAll('.highlight').forEach(e => e.classList.remove('highlight'));
        }
        findNextMatch();
    }
    function enableClickHighlight() {
        // نستمع لأي كليك على أزرار الحساب أو الأب
        $(document).on('click', '.Text_PARENT-btn, .Text-btn', function () {
            // إزالة أي تمييز قديم
            $('.highlightFoucs').removeClass('highlightFoucs');
            // إضافة التمييز على العنصر الحالي
            $(this).addClass('highlightFoucs');
            // تمرير العنصر إلى وسط الشاشة (اختياري)
            this.scrollIntoView({ behavior: 'smooth', block: 'center' });
        });
    }
    // ====== تحميل أبناء العقدة (كما عندك) ======
    // ====== تحميل أبناء العقدة ======
    function loadChildren(compCode, parentAcc, page = 1, searchValue = '') {
        return __awaiter(this, void 0, void 0, function* () {
            const containerId = `${compCode}-${parentAcc}`;
            const container = document.getElementById(containerId);
            if (!container)
                return;
            // لو أول تحميل امسح أي زرار تحميل قديم
            if (page === 1) {
                container.innerHTML = '';
            }
            else {
                // في حالة تحميل المزيد، شيل الزر القديم بس
                const oldMore = container.querySelector('.more-btn');
                if (oldMore)
                    oldMore.remove();
            }
            const loadingMsg = document.createElement('div');
            loadingMsg.textContent = '⏳ جاري التحميل...';
            loadingMsg.className = 'loading';
            container.appendChild(loadingMsg);
            const data = yield GetData_Account(parentAcc, page, searchValue);
            container.removeChild(loadingMsg);
            data.items.forEach(item => {
                const li = document.createElement('li');
                li.className = 'node';
                const TextBtn = document.createElement('span');
                TextBtn.textContent = `${item.ACC_DESCA} ( ${item.ACC_CODE} )`;
                TextBtn.className = 'Text_PARENT-btn';
                if (item.DETAIL === false) {
                    const expandBtn = document.createElement('span');
                    expandBtn.textContent = '➕';
                    expandBtn.className = 'expand-btn';
                    expandBtn.id = "Click_" + `${item.COMP_CODE}-${item.ACC_CODE}`;
                    expandBtn.onclick = () => {
                        Glopal_IDAccClick = expandBtn.id;
                        toggleNode(item.COMP_CODE, item.ACC_CODE, li);
                    };
                    li.prepend(expandBtn);
                    TextBtn.className = 'Text-btn';
                }
                TextBtn.ondblclick = () => {
                    Glopal_IDAccClick = "Click_" + `${item.COMP_CODE}-${item.PARENT_ACC}`;
                    View_Account(item);
                };
                li.prepend(TextBtn);
                const childUl = document.createElement('ul');
                childUl.id = `${item.COMP_CODE}-${item.ACC_CODE}`;
                li.appendChild(childUl);
                container.appendChild(li);
            });
            // ✅ زر تحميل المزيد في آخر القائمة
            if (data.hasMore) {
                const moreBtn = document.createElement('button');
                //moreBtn.textContent = `تحميل المزيد (صفحة ${page} من ${data.TotalPages})`;
                moreBtn.textContent = `  تحميل المزيد .....⏬`;
                moreBtn.className = 'more-btn load-more-btn'; // عشان نعرف نشيله بعدين
                moreBtn.onclick = () => {
                    loadChildren(compCode, parentAcc, page + 1, searchValue);
                };
                container.appendChild(moreBtn);
            }
        });
    }
    function toggleNode(compCode, accCode, nodeElement, searchValue = '') {
        const ul = nodeElement.querySelector('ul');
        const expandBtn = nodeElement.querySelector('.expand-btn');
        if (!ul || !expandBtn)
            return;
        if (ul.childElementCount === 0) {
            // أول مرة يفتح
            loadChildren(compCode, accCode, 1, searchValue).then(() => {
                expandBtn.textContent = '➖';
            });
        }
        else {
            if (expandBtn.textContent === '➖') {
                // إغلاق العقدة → نفرّغ الأبناء
                ul.innerHTML = '';
                expandBtn.textContent = '➕';
                // ✨ مسح الأبناء من visited + searchQueue
                visited.forEach(v => {
                    if (ul.contains(v))
                        visited.delete(v);
                });
                searchQueue = searchQueue.filter(q => !ul.contains(q.container));
                // ✨ Reset كامل للبحث
                currentKeyword = '';
                visited.clear();
                searchQueue = [];
                // ✨ إزالة أي تمييز
                $('.highlight').removeClass('highlight');
            }
            else {
                // فتح العقدة من جديد
                loadChildren(compCode, accCode, 1, searchValue).then(() => {
                    expandBtn.textContent = '➖';
                });
            }
        }
    }
    function GetData_Account(parentAcc, PageNum, SearchValue = '') {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            debugger;
            Glopal_PageNum = PageNum;
            Glopal_SearchValue = SearchValue;
            let filter = `COMP_CODE = ${CompCode} AND ISNULL(PARENT_ACC,'0') = N'${parentAcc == null ? '0' : parentAcc}'`;
            const _ResData = GetDataFromPagination('A_ACCOUNT', filter, PageNum, PageSize, 'COMP_CODE', SearchValue, true);
            debugger;
            const TotalPages = (_b = (_a = _ResData === null || _ResData === void 0 ? void 0 : _ResData.PaginationResult) === null || _a === void 0 ? void 0 : _a.TotalPages) !== null && _b !== void 0 ? _b : 0;
            const rows = Array.isArray(_ResData === null || _ResData === void 0 ? void 0 : _ResData.DataTable) ? _ResData.DataTable : [];
            // السيرفر بيرجع الصفحة جاهزة
            const items = rows;
            // نحدد إذا في صفحات تانية
            const hasMore = PageNum < TotalPages;
            yield new Promise(resolve => setTimeout(resolve, 300)); // محاكاة التأخير
            return { items, hasMore, TotalPages };
        });
    }
    // ====== البحث التدريجي مع استئناف دقيق ======
    // ====== البحث التدريجي مع استئناف دقيق + دعم الصفحات ======
    // ====== البحث التدريجي مع استئناف دقيق + دعم الصفحات ======
    // ====== البحث التدريجي مع استئناف دقيق + دعم تحميل المزيد ======
    function findNextMatch() {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            while (searchQueue.length > 0) {
                const item = searchQueue[0];
                const container = item.container;
                // لو لسه العقدة فاضية → افتحها الأول
                if (container.childElementCount === 0 && item.parentExpandBtn) {
                    item.parentExpandBtn.click();
                    yield waitForChildren(container);
                }
                let nodes = Array.from(container.querySelectorAll(':scope > li.node'));
                // لو وصلنا نهاية الصفحة الحالية
                if (item.index >= nodes.length) {
                    // لو فيه زر "تحميل المزيد"
                    const moreBtn = container.querySelector('.more-btn');
                    if (moreBtn) {
                        const beforeCount = nodes.length;
                        moreBtn.click();
                        yield waitForMoreChildren(container, beforeCount);
                        // 🔄 بعد التحميل لازم نعيد حساب nodes
                        nodes = Array.from(container.querySelectorAll(':scope > li.node'));
                        continue; // نكمل من نفس الـ container
                    }
                    // لو مفيش صفحات تانية → نشيل العنصر
                    searchQueue.shift();
                    continue;
                }
                for (let i = item.index; i < nodes.length; i++) {
                    item.index = i + 1;
                    const li = nodes[i];
                    if (visited.has(li))
                        continue;
                    visited.add(li);
                    const textBtn = li.querySelector('.Text_PARENT-btn, .Text-btn');
                    const text = ((_a = textBtn === null || textBtn === void 0 ? void 0 : textBtn.textContent) !== null && _a !== void 0 ? _a : '').toLowerCase();
                    if (text.includes(currentKeyword)) {
                        highlightAndFocus(textBtn);
                        return; // وقف عند أول نتيجة
                    }
                    const childUl = li.querySelector('ul');
                    const expandBtn = li.querySelector('.expand-btn');
                    if (childUl) {
                        searchQueue.push({ container: childUl, index: 0, parentExpandBtn: expandBtn !== null && expandBtn !== void 0 ? expandBtn : undefined });
                    }
                }
            }
            // لو خلص كل الطابور
            ShowMessage('Not Found 😁', 'انتهت النتائج 😁');
            // ✨ Reset كامل للبحث
            currentKeyword = '';
            visited.clear();
            searchQueue = [];
            // ✨ إزالة أي تمييز
            $('.highlight').removeClass('highlight');
        });
    }
    // ✨ استنى لحد ما يضاف عناصر جديدة بعد زر "تحميل المزيد"
    function waitForMoreChildren(ul, beforeCount) {
        return new Promise(resolve => {
            const obs = new MutationObserver(() => {
                const currentCount = ul.querySelectorAll(':scope > li.node').length;
                if (currentCount > beforeCount) {
                    obs.disconnect();
                    resolve();
                }
            });
            obs.observe(ul, { childList: true });
        });
    }
    function waitForChildren(ul) {
        return new Promise(resolve => {
            const obs = new MutationObserver(() => {
                if (ul.childElementCount > 0) {
                    obs.disconnect();
                    resolve();
                }
            });
            obs.observe(ul, { childList: true });
            // كحماية: إذا صار فيها عناصر بدون انتظار (نادرة) نقدر نضيف timeout لاحقاً
        });
    }
    function highlightAndFocus(element) {
        // إزالة تمييز سابق
        document.querySelectorAll('.highlight').forEach(e => e.classList.remove('highlight'));
        element.classList.add('highlight');
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
    function View_Account(item) {
        localStorage.setItem(GetParameterByName('App') + "TypePage", "1");
        SetModelGlopel(item);
        Glopal_parentAcc = item.PARENT_ACC;
        OpenPagePartial("EditAccountTree", "Edit Account Tree ", () => { RefrshPage(); });
    }
    var Run_Fun = false;
    function Display_Refrsh() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!Run_Fun) {
                Run_Fun = true;
                return;
            }
            yield GetData_Account(Glopal_parentAcc, Glopal_PageNum, Glopal_SearchValue);
        });
    }
    function RefrshPage() {
        debugger;
        $('#' + Glopal_IDAccClick).click();
        setTimeout(function () {
            $('#' + Glopal_IDAccClick).click();
        }, 200);
    }
})(AccountTree || (AccountTree = {}));
//# sourceMappingURL=AccountTree.js.map