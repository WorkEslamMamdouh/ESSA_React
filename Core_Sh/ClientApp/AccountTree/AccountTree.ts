$(document).ready(() => {
	AccountTree.InitalizeComponent();
});

namespace AccountTree {
	var CompCode;
	var BranchCode;
	var sys: SystemTools = new SystemTools();
	var SysSession: SystemSession = GetSystemSession();

	var Tree_View: HTMLButtonElement;
	var Editing_Tab: HTMLButtonElement;
	var JournalList: Array<A_JOURNAL_DETAIL> = new Array<A_JOURNAL_DETAIL>();
	var Details_ACCOUNT: Array<A_ACCOUNT> = new Array<A_ACCOUNT>();
	var Details_GCodes: Array<G_Codes> = new Array<G_Codes>();
	var DetGCod: Array<G_Codes> = new Array<G_Codes>();

	var txtSearch: HTMLInputElement;

	var AddMod = true;
	var Res: SystemResources = GetGlopelResources();

	CompCode = Number(SysSession.CurrentEnvironment.CompCode);
	BranchCode = Number(SysSession.CurrentEnvironment.BranchCode);

	let Glopal_parentAcc: string
	let Glopal_PageNum: number
	let Glopal_SearchValue: string = ''
	let Glopal_IDAccClick: string = ''
	// Type لطابور البحث: كل عنصر يحتوي UL (container) ومؤشر للبدء و reference لزر التوسيع في الأب
	type QueueItem = {
		container: HTMLElement;           // ال UL الذي سنفحص عناصره (li)
		index: number;                    // مؤشر البداية داخل هذا UL
		parentExpandBtn?: HTMLElement;    // زر التوسيع في الـ parent li (نحتاجه عند التوسيع)
	};

	// ---- حالة البحث ----
	let currentKeyword = '';
	let searchQueue: QueueItem[] = [];
	let visited = new Set<HTMLElement>(); // لتجنب إعادة فحص نفس li
	// --------------------------------

	const PageSize = 6;
	export function InitalizeComponent() {
		InitalizeControls();
		InitializeEvents();
		enableClickHighlight();   // ← أضف هذا السطر
		loadChildren(1, null);
		Close_Loder();
	}

	function InitalizeControls() { }

	function InitializeEvents() {
		$('#btnSearch').on('click', () => {
			Search();
		});


		Event_key('Enter', 'txtSearch', 'btnSearch');

	}

	function Search() {

		const kw = ($('#txtSearch').val() as string)?.trim();

		// لو المستخدم فضّى البحث
		if (!kw) {
			currentKeyword = '';          // ✨ Reset
			visited.clear();              // ✨ Reset
			searchQueue = [];             // ✨ Reset
			$('.highlight').removeClass('highlight');
			return;
		}

		// لو الكلمة جديدة أو حتى نفس القديمة بعد ما فضينا البحث
		if (kw.toLowerCase() !== currentKeyword) {
			currentKeyword = kw.toLowerCase();
			visited.clear();              // ✨ Reset
			searchQueue = [];             // ✨ Reset

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
			(this as HTMLElement).scrollIntoView({ behavior: 'smooth', block: 'center' });
		});
	}


	// ====== تحميل أبناء العقدة (كما عندك) ======
	// ====== تحميل أبناء العقدة ======
	async function loadChildren(
		compCode,
		parentAcc,
		page = 1,
		searchValue: string = ''
	) {
		const containerId = `${compCode}-${parentAcc}`;
		const container = document.getElementById(containerId);
		if (!container) return;

		// لو أول تحميل امسح أي زرار تحميل قديم
		if (page === 1) {
			container.innerHTML = '';
		} else {
			// في حالة تحميل المزيد، شيل الزر القديم بس
			const oldMore = container.querySelector('.more-btn');
			if (oldMore) oldMore.remove();
		}

		const loadingMsg = document.createElement('div');
		loadingMsg.textContent = '⏳ جاري التحميل...';
		loadingMsg.className = 'loading';
		container.appendChild(loadingMsg);

		const data = await GetData_Account(parentAcc, page, searchValue);
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
				expandBtn.id = "Click_" + `${item.COMP_CODE}-${item.ACC_CODE}`
				expandBtn.onclick = () => {
					Glopal_IDAccClick = expandBtn.id
					toggleNode(item.COMP_CODE, item.ACC_CODE, li)
				};
				li.prepend(expandBtn);
				TextBtn.className = 'Text-btn';
			}

			TextBtn.ondblclick = () => {

				Glopal_IDAccClick = "Click_" + `${item.COMP_CODE}-${item.PARENT_ACC}`

				View_Account(item)
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
	}

	function toggleNode(compCode, accCode, nodeElement, searchValue: string = '') {
		const ul = nodeElement.querySelector('ul');
		const expandBtn = nodeElement.querySelector('.expand-btn');
		if (!ul || !expandBtn) return;

		if (ul.childElementCount === 0) {
			// أول مرة يفتح
			loadChildren(compCode, accCode, 1, searchValue).then(() => {
				expandBtn.textContent = '➖';
			});
		} else {
			if (expandBtn.textContent === '➖') {
				// إغلاق العقدة → نفرّغ الأبناء
				ul.innerHTML = '';
				expandBtn.textContent = '➕';

				// ✨ مسح الأبناء من visited + searchQueue
				visited.forEach(v => {
					if (ul.contains(v)) visited.delete(v);
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


	async function GetData_Account(parentAcc: string, PageNum: number, SearchValue: string = '') {

		debugger
		Glopal_PageNum = PageNum
		Glopal_SearchValue = SearchValue

		let filter = `COMP_CODE = ${CompCode} AND ISNULL(PARENT_ACC,'0') = N'${parentAcc == null ? '0' : parentAcc}'`;

		const _ResData = GetDataFromPagination(
			'A_ACCOUNT',
			filter,
			PageNum,
			PageSize,
			'COMP_CODE',
			SearchValue,
			true
		);

		debugger


		const TotalPages = _ResData?.PaginationResult?.TotalPages ?? 0;
		const rows: Array<A_ACCOUNT> = Array.isArray(_ResData?.DataTable) ? _ResData.DataTable : [];

		// السيرفر بيرجع الصفحة جاهزة
		const items: Array<A_ACCOUNT> = rows;

		// نحدد إذا في صفحات تانية

		const hasMore = PageNum < TotalPages;

		await new Promise(resolve => setTimeout(resolve, 300)); // محاكاة التأخير
		return { items, hasMore, TotalPages };
	}


	// ====== البحث التدريجي مع استئناف دقيق ======
	// ====== البحث التدريجي مع استئناف دقيق + دعم الصفحات ======
	// ====== البحث التدريجي مع استئناف دقيق + دعم الصفحات ======
	// ====== البحث التدريجي مع استئناف دقيق + دعم تحميل المزيد ======
	async function findNextMatch() {
		while (searchQueue.length > 0) {
			const item = searchQueue[0];
			const container = item.container;

			// لو لسه العقدة فاضية → افتحها الأول
			if (container.childElementCount === 0 && item.parentExpandBtn) {
				item.parentExpandBtn.click();
				await waitForChildren(container);
			}

			let nodes = Array.from(container.querySelectorAll(':scope > li.node')) as HTMLElement[];

			// لو وصلنا نهاية الصفحة الحالية
			if (item.index >= nodes.length) {
				// لو فيه زر "تحميل المزيد"
				const moreBtn = container.querySelector('.more-btn') as HTMLButtonElement;
				if (moreBtn) {
					const beforeCount = nodes.length;
					moreBtn.click();
					await waitForMoreChildren(container, beforeCount);

					// 🔄 بعد التحميل لازم نعيد حساب nodes
					nodes = Array.from(container.querySelectorAll(':scope > li.node')) as HTMLElement[];
					continue; // نكمل من نفس الـ container
				}

				// لو مفيش صفحات تانية → نشيل العنصر
				searchQueue.shift();
				continue;
			}

			for (let i = item.index; i < nodes.length; i++) {
				item.index = i + 1;

				const li = nodes[i];
				if (visited.has(li)) continue;
				visited.add(li);

				const textBtn = li.querySelector('.Text_PARENT-btn, .Text-btn') as HTMLElement;
				const text = (textBtn?.textContent ?? '').toLowerCase();

				if (text.includes(currentKeyword)) {
					highlightAndFocus(textBtn);
					return; // وقف عند أول نتيجة
				}

				const childUl = li.querySelector('ul') as HTMLElement;
				const expandBtn = li.querySelector('.expand-btn') as HTMLElement;
				if (childUl) {
					searchQueue.push({ container: childUl, index: 0, parentExpandBtn: expandBtn ?? undefined });
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
	}

	// ✨ استنى لحد ما يضاف عناصر جديدة بعد زر "تحميل المزيد"
	function waitForMoreChildren(ul: HTMLElement, beforeCount: number) {
		return new Promise<void>(resolve => {
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


	function waitForChildren(ul: HTMLElement) {
		return new Promise<void>(resolve => {
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

	function highlightAndFocus(element: HTMLElement) {
		// إزالة تمييز سابق
		document.querySelectorAll('.highlight').forEach(e => e.classList.remove('highlight'));
		element.classList.add('highlight');
		element.scrollIntoView({ behavior: 'smooth', block: 'center' });
	}

	function View_Account(item: A_ACCOUNT) {
		localStorage.setItem(GetParameterByName('App') + "TypePage", "1");
		SetModelGlopel(item);
		Glopal_parentAcc = item.PARENT_ACC
		OpenPagePartial("EditAccountTree", "Edit Account Tree ", () => { RefrshPage(); });

	}

	var Run_Fun = false;
	async function Display_Refrsh() {
		if (!Run_Fun) {
			Run_Fun = true;
			return
		}
		await GetData_Account(Glopal_parentAcc, Glopal_PageNum, Glopal_SearchValue);
	}




	function RefrshPage() {
		debugger					  
		$('#' + Glopal_IDAccClick).click();
					  
		setTimeout(function () {
			$('#' + Glopal_IDAccClick).click();
		}, 200);
	}


}
