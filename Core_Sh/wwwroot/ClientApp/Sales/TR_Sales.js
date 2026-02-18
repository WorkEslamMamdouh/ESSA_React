$(document).ready(() => {
    TR_Sales.InitalizeComponent();
});
var TR_Sales;
(function (TR_Sales) {
    var sys = new SystemTools();
    var SysSession = GetSystemSession();
    var _ModelProfile = new GQ_USERS();
    var CartIcon;
    var But_Prof_RefrashData;
    var But_Show_Detail_Salar;
    var But_Show_Detail_Covenant;
    var CloseInv;
    var _MasterDetails = new MasterDetails();
    var _Category = new Array();
    var _ItemFamily = new Array();
    var _DisplayAllItems = new Array();
    var _GetItemInfo = new Array();
    var ListModelItems = new Array();
    var Res = GetGlopelResources();
    var BtnNameCustomer;
    var PrintExcel;
    var PrintPdf;
    var tax;
    var DiscountPrc;
    var discount;
    var db_TypeFin;
    var Card_Type;
    var SalesManID;
    var Assistant;
    var VatType;
    var AmountPaid;
    var CompCode = Number(SysSession.CurrentEnvironment.CompCode);
    //****************************************************************************************
    var generate;
    var invoiceCancel;
    var invoicePrint;
    var GetOrder;
    var ZeroCount;
    let GlopID = 0;
    let InvType = 1;
    debugger;
    if (SysSession.CurrentEnvironment.I_Control.Is_Restaurant) {
        $('#SalesManID').addClass('display_none');
        $('#labelSalesManID').addClass('display_none');
    }
    else {
        $('#SalesManID').removeClass('display_none');
        $('#labelSalesManID').removeClass('display_none');
    }
    function InitalizeComponent() {
        InitalizeControls();
        InitializeEvents();
        SearchID();
        GetAllData();
        DisplayCounter();
        Close_Loder();
    }
    TR_Sales.InitalizeComponent = InitalizeComponent;
    function InitalizeControls() {
        CartIcon = document.getElementById("cart-icon");
        generate = document.getElementById("generate-invoice");
        invoiceCancel = document.getElementById("invoiceCancel");
        invoicePrint = document.getElementById("invoicePrint");
        GetOrder = document.getElementById("GetOrder");
        ZeroCount = document.getElementById("ZeroCount");
        CloseInv = document.getElementById("CloseInv");
        discount = document.getElementById("discount");
        AmountPaid = document.getElementById("AmountPaid");
        DiscountPrc = document.getElementById("DiscountPrc");
        tax = document.getElementById("tax");
        db_TypeFin = document.getElementById("db_TypeFin");
        Card_Type = document.getElementById("Card_Type");
        SalesManID = document.getElementById("SalesManID");
        Assistant = document.getElementById("Assistant");
        VatType = document.getElementById('VatType');
        BtnNameCustomer = document.getElementById('BtnNameCustomer');
    }
    function InitializeEvents() {
        CartIcon.onclick = toggleCart;
        CloseInv.onclick = closeInvoice;
        invoicePrint.onclick = () => { Insert(true); };
        generate.onclick = () => { Insert(false); };
        invoiceCancel.onclick = Clear;
        discount.onkeyup = ComputTotal;
        discount.onchange = ComputTotal;
        DiscountPrc.onchange = ComputDiscountPrc;
        DiscountPrc.onkeyup = ComputDiscountPrc;
        tax.onkeyup = ComputTotal;
        tax.onchange = ComputTotal;
        db_TypeFin.onchange = db_TypeFin_onchange;
        Card_Type.onchange = ComputTotal;
        VatType.onchange = VatType_onchange;
        BtnNameCustomer.onclick = SearchCustomer;
        GetOrder.onclick = GetOrder_onclick;
        ZeroCount.onclick = ZeroCount_onclick;
        AmountPaid.onchange = ComputAmountPaid;
    }
    function SearchCustomer() {
        //and IsCreditCustomer = " + IsCredit
        //let IsCredit = IsCash.value == "1" ? "0" : "1"
        //  sys.FindKey("Customer", "btnCustomer", " CompCode = " + CompCode + "  and Isactive = 1  ", () => {
        //sys.FindKeySpeed("Customer", " CompCode = " + CompCode + "  and Isactive = true  ", 'SearchForm', () => {
        sys.FindKeyPagination("Customer", "btnCustomer", " CompCode = " + CompCode + "  and Isactive = 1  ", () => {
            let SelectedItem = SelectDataSearch.DataRow;
            //let SelectedItem = SearchGrid.SearchDataGrid.SelectedItem;
            $('#txtCustomerID').val(SelectedItem.CustomerId);
            $('#BtnNameCustomer').html(SelectedItem.NAMEA);
        });
    }
    function AssignDetails() {
        for (var i = 0; i < ListModelItems.length; i++) {
            ListModelItems[i].StatusFlag = 'i';
            ListModelItems[i].RetQty = 0;
            ListModelItems[i].DiscountPrc = Number(DiscountPrc.value);
            let _DiscountAmount = Number(((Number(DiscountPrc.value) * ListModelItems[i].UnitPrice) / 100).toFixed(2));
            ListModelItems[i].DiscountAmount = _DiscountAmount;
            ListModelItems[i].NetUnitPrice = Number((ListModelItems[i].UnitPrice - _DiscountAmount).toFixed(2));
            ListModelItems[i].VatPrc = Number($('#tax').val());
            ListModelItems[i].VatTypeID = Number($("#VatType").val());
            var total = Number(ListModelItems[i].Quantity) * Number(ListModelItems[i].NetUnitPrice);
            var _vatAmount = Number((Number(total) * Number($('#tax').val()) / 100).toFixed(2));
            ListModelItems[i].VatAmount = _vatAmount;
            let NetAfterVat = Number((_vatAmount + total).toFixed(2));
            ListModelItems[i].NetAfterVat = NetAfterVat;
        }
    }
    function ComputDiscountPrc() {
        let TotalDiscountAmount = 0;
        let TotalQuantity = 0;
        for (var i = 0; i < ListModelItems.length; i++) {
            let _DiscountAmount = Number(((Number(DiscountPrc.value) * ListModelItems[i].UnitPrice) / 100).toFixed(2));
            TotalDiscountAmount = TotalDiscountAmount + (_DiscountAmount * ListModelItems[i].Quantity);
            TotalQuantity = TotalQuantity + ListModelItems[i].Quantity;
        }
        discount.value = Number(TotalDiscountAmount).toFixed(2);
        $("#discount").change();
    }
    function VatType_onchange() {
        $('#tax').val($('option:selected', $("#VatType")).attr('data-Prc'));
        $('#tax').change();
    }
    function SearchID() {
        SearchIDGnr(() => {
            let DataItemUnite = ModelSearch.ModelMaster;
            addToItem(DataItemUnite.ItemID, DataItemUnite.ItemUnitID);
        }, " ");
    }
    function db_TypeFin_onchange() {
        //if (db_TypeFin.value == '0') {
        //    $('._Card_Type').removeClass("display_none")
        //}
        //else {
        //    $('._Card_Type').addClass("display_none")
        //}
        ComputTotal();
    }
    function ComputTotal() {
        try {
            ComputDiscountPrc();
        }
        catch (e) {
        }
        const Total_Net = document.getElementById('cart-totalNet');
        const Total_Due = document.getElementById('cart-totalDue');
        let ItemTotal = Number($('#cart-total').text());
        let _discount = Number($('#discount').val());
        let _tax = Number($('#tax').val());
        let totalAfterDiscount = (ItemTotal - _discount);
        let _Total = (totalAfterDiscount + (totalAfterDiscount * _tax / 100)).toFixed(2);
        Total_Net.innerText = _Total;
        let Prc = Number($('option:selected', $("#Card_Type")).attr('data-prc'));
        let Due = (((Prc * Number(_Total)) / 100) + Number(_Total)).toFixed(2);
        Total_Due.innerText = Due;
    }
    function GetAllData() {
        let con = "";
        var Table;
        Table =
            [
                { NameTable: 'D_I_Category', Condition: " CompCode = " + CompCode },
                { NameTable: 'D_I_ItemFamily', Condition: " CompCode = " + CompCode },
                { NameTable: 'IQ_DisplayAllItemsActive', Condition: " CompCode = " + CompCode + " and  TypeUsing in (0,1) " },
                { NameTable: 'IQ_DisplayAllItemsUnites', Condition: " CompCode = " + CompCode + " and  TypeUsing in (0,1) " },
                { NameTable: 'D_A_CashTypes', Condition: "CompCode = " + CompCode + " and IsActive = 1" },
                { NameTable: 'D_A_VatType', Condition: "CompCode = " + CompCode + " and Type = 1 " },
                { NameTable: 'G_Employees', Condition: "CompCode = " + CompCode + " and  ( EmpType = 3 or  EmpType = 4)" },
            ];
        DataResult(Table);
        //************************************************************************************************************** 
        _Category = GetDataTable('D_I_Category');
        _ItemFamily = GetDataTable('D_I_ItemFamily');
        _DisplayAllItems = GetDataTable('IQ_DisplayAllItemsActive');
        _GetItemInfo = GetDataTable('IQ_DisplayAllItemsUnites');
        let CardType = GetDataTable('D_A_CashTypes');
        CardType = CardType.sort(dynamicSort("Ser"));
        let Vat_Type = GetDataTable('D_A_VatType');
        Vat_Type = Vat_Type.sort(dynamicSort("LineOrder"));
        let _G_Employees = GetDataTable('G_Employees');
        let ListSalesMan = _G_Employees.filter(x => x.EmpType == 3);
        let ListAssistant = _G_Employees.filter(x => x.EmpType == 4);
        FillDropwithAttr(Vat_Type, "VatType", "VatTypeID", "Describtion", "No", "Prc", "VatPrc");
        VatType_onchange();
        FillDropwithAttr(CardType, "Card_Type", "CashTypeID", (Res.Lang == "Ar" ? "Description" : "Description"), "No", "prc", "ChargePrc");
        FillDropwithAttr(ListSalesMan, "SalesManID", "EmpID", "Emp_Name", "No", "", "");
        FillDropwithAttr(ListAssistant, "Assistant", "EmpID", "Emp_Name", "No", "", "");
        BulidCategory();
    }
    function RefrashDataItems() {
        //var Table: Array<Table>;
        //Table =
        //	[
        //		{ NameTable: 'IQ_DisplayAllItemsActive', Condition: " CompCode = " + CompCode + " " },
        //		{ NameTable: '_IQ_DisplayAllItemsUnites', Condition: " CompCode = " + CompCode + " " },
        //	]
        //DataResult(Table);
        ////**************************************************************************************************************
        //_DisplayAllItems = GetDataTable('IQ_DisplayAllItemsActive');
        //_GetItemInfo = GetDataTable('_IQ_DisplayAllItemsUnites');
        //$('#btnCateg0').click();
        GetAllData();
    }
    function BulidCategory() {
        const CategList = document.getElementById('DivCategory');
        if (!CategList)
            return;
        CategList.innerHTML = '';
        let cnt = 0;
        _Category.forEach(item => {
            const itemDiv = document.createElement('div');
            //itemDiv.classList.add('item-box');
            itemDiv.innerHTML = ` 
            <button id="btnCateg${cnt}"  class="Cat  animate__animated animate__lightSpeedInLeft" > ${item.DescA} </button>
        `;
            CategList.appendChild(itemDiv);
            $('#btnCateg' + cnt).on('click', function () {
                filterFamilies(item.CatID);
                ActiveBtn('ActiveCat', 'Cat', this, "animate__fadeOutRightBig", "animate__fadeInRightBig");
            });
            cnt++;
        });
        $('#btnCateg0').click();
    }
    function filterFamilies(catId) {
        const itemsList = document.getElementById('items-list');
        if (!itemsList)
            return;
        itemsList.innerHTML = '';
        const familyButtonsContainer = document.getElementById('family-buttons');
        if (!familyButtonsContainer)
            return;
        familyButtonsContainer.innerHTML = '';
        let Family = _ItemFamily.filter(x => x.CatID == catId);
        for (var i = 0; i < Family.length; i++) {
            const button = document.createElement('button');
            button.classList.add('button');
            button.innerText = Family[i].DescA;
            button.classList.add('_Family');
            //button.classList.add('animate__animated')
            button.classList.add('animate__backInDown');
            button.id = "btnFamily" + i;
            button.setAttribute("FamilyID", Family[i].ItemFamilyID.toString());
            //button.onclick = () => {
            //     
            //    updateItems(Family[i].ItemFamilyID);
            //};
            familyButtonsContainer.appendChild(button);
            $('#btnFamily' + i).on('click', function () {
                updateItems(this);
                ActiveBtn('ActiveFamil', '_Family', this, "animate__fadeOutDownBig", "animate__fadeInUpBig");
            });
        }
        $('#btnFamily0').click();
    }
    function updateItems(_this) {
        let selectedFamilyId = Number($('#' + _this.id + '').attr('FamilyID'));
        const itemsList = document.getElementById('items-list');
        if (!itemsList)
            return;
        itemsList.innerHTML = '';
        const filteredItems = _DisplayAllItems.filter(item => item.ItemFamilyID === selectedFamilyId);
        // إضافة كلاس للشبكة
        itemsList.className = 'products-grid';
        let cnt = 0;
        filteredItems.forEach(item => {
            const itemDiv = document.createElement('div');
            itemDiv.className = 'product-card';
            // إضافة data attribute لتخزين ItemID
            itemDiv.setAttribute('data-item-id', item.ItemID.toString());
            itemDiv.setAttribute('data-item-index', cnt.toString());
            let UrlImg = "";
            if (setVal(item.Image).trim() != "") {
                UrlImg = setVal(item.Image).trim();
            }
            else {
                UrlImg = 'default';
            }
            UrlImg = GetUrlImgCach("Items_Images", UrlImg);
            const item_Image = UrlImg;
            const stockQuantity = item.OneHandQuantity || 1;
            itemDiv.innerHTML = `
            <div class="product-card-inner" id="product-card-${cnt}">
                <div class="product-image">
                    <img src="${item_Image}" alt="${item.ItemName}" loading="lazy">
                    <span class="product-quantity">${stockQuantity}</span>
                </div>
                
                <div class="product-info">
                    <h3 class="product-name">${item.ItemName}</h3>
                    <p class="product-desc">${item.Remarks || 'وصف المنتج'}</p>
                    
                    <div class="product-footer">
                        <span class="product-price">${formatPrice(item.UnitPrice)}</span>
                        
                        <button id="btnitems${cnt}" 
                                class="btn-add-product" 
                                data-item-id="${item.ItemID}"
                                style="background-color: ${item.backgroundColor || '#4361ee'}; color: ${item.FontColor || '#ffffff'};">
                            <span class="btn-text">أضف إلى السلة</span>
                            <span class="btn-icon">+</span>
                        </button>
                    </div>
                </div>
            </div>
        `;
            itemsList.appendChild(itemDiv);
            // ربط الأحداث بعد إضافة العنصر للـ DOM
            const btn = document.getElementById(`btnitems${cnt}`);
            const card = document.getElementById(`product-card-${cnt}`);
            if (btn) {
                // حدث النقر على الزر
                btn.addEventListener('click', function (e) {
                    e.preventDefault();
                    e.stopPropagation();
                    // استدعاء الدالة مع تمرير العنصر الحالي
                    SelectItems(item.ItemID, this);
                    // تأثير النقر على الزر
                    this.classList.add('clicked');
                    setTimeout(() => {
                        this.classList.remove('clicked');
                    }, 200);
                    // تأثير حركي على الكارد
                    const parentCard = this.closest('.product-card');
                    if (parentCard) {
                        parentCard.classList.add('card-clicked');
                        setTimeout(() => {
                            parentCard.classList.remove('card-clicked');
                        }, 200);
                    }
                });
            }
            if (card) {
                // حدث النقر على الكارد
                card.addEventListener('click', function (e) {
                    // منع النقر إذا كان المصدر هو الزر نفسه (لمنع التكرار)
                    if (e.target === btn || (btn === null || btn === void 0 ? void 0 : btn.contains(e.target))) {
                        return;
                    }
                    e.preventDefault();
                    // محاكاة النقر على الزر
                    if (btn) {
                        // إضافة تأثير بسيط للكارد
                        this.classList.add('card-clicked');
                        // تنفيذ نفس وظيفة الزر
                        SelectItems(item.ItemID, btn);
                        // تأثير النقر على الزر
                        btn.classList.add('clicked');
                        setTimeout(() => {
                            this.classList.remove('card-clicked');
                            btn.classList.remove('clicked');
                        }, 200);
                    }
                });
                // تغيير مؤشر الفأرة عند المرور على الكارد
                card.style.cursor = 'pointer';
            }
            cnt++;
        });
    }
    // تنسيق السعر
    function formatPrice(price) {
        return new Intl.NumberFormat('ar-SA', {
            style: 'currency',
            currency: 'SAR',
            minimumFractionDigits: 2
        }).format(price).replace('SAR', 'ر.س');
    }
    function SelectItems(itemId, _this) {
        debugger;
        if (Number(itemId) != 0) { // Check is Service
            let _Unites = _GetItemInfo.filter(x => x.ItemID == itemId);
            if (_Unites.length > 1) {
                BulidUnits(_Unites);
            }
            else {
                if (_Unites.length > 0) {
                    addToItem(itemId, Number(_Unites[0].ItemUnitID));
                    ActiveBtn('', '_Items', _this, " btn-add-product animate__zoomOutRight", "btn-add-product animate__zoomInRight");
                }
            }
        }
    }
    function BulidUnits(_unites) {
        const UnitsList = document.getElementById('DivUnits');
        if (!UnitsList)
            return;
        UnitsList.innerHTML = '';
        let cnt = 0;
        _unites.forEach(item => {
            const itemDiv = document.createElement('div');
            itemDiv.innerHTML = ` 
            <button id="btnUnits${cnt}" title="${item.Quantity}"  class="Units  animate__animated animate__lightSpeedInLeft" > ${item.ItemName} </button>
        `;
            UnitsList.appendChild(itemDiv);
            $('#btnUnits' + cnt).on('click', function () {
                addToItem(item.ItemID, Number(item.ItemUnitID));
                ActiveBtn('ActiveUnits', 'Units', this, "animate__zoomOut", "animate__zoomIn");
                //setTimeout(function () {
                var modal = document.getElementById("myModalItemUnites");
                modal.style.display = "none";
                //}, 500);
            });
            cnt++;
        });
        var modal = document.getElementById("myModalItemUnites");
        modal.style.display = "block";
    }
    function addToItem(itemId, ItemUnitID) {
        if (!ChackItemQty(itemId, ItemUnitID)) {
            return;
        }
        let item;
        let existingItem;
        // البحث عن العنصر في قائمة الأصناف
        for (let i = 0; i < _GetItemInfo.length; i++) {
            if (_GetItemInfo[i].ItemID === itemId && _GetItemInfo[i].ItemUnitID === ItemUnitID) {
                item = _GetItemInfo[i];
                break;
            }
        }
        if (!item)
            return;
        // البحث عن العنصر في السلة
        for (let i = 0; i < ListModelItems.length; i++) {
            if (ListModelItems[i].ItemID === itemId && ListModelItems[i].ItemUnitID === ItemUnitID) {
                existingItem = ListModelItems[i];
                break;
            }
        }
        if (existingItem) {
            existingItem.Quantity++;
        }
        else {
            ListModelItems.push(Object.assign(Object.assign({}, item), { Quantity: 1 }));
        }
        UpdateItemInBasket();
    }
    function UpdateItemInBasket() {
        const cartItemsDiv = document.getElementById('cart-items');
        const cartIconCount = document.getElementById('cart-icon-count');
        const cartTotal = document.getElementById('cart-total');
        const Total_Net = document.getElementById('cart-totalNet');
        const cartItemCount = document.getElementById('cart-item-count');
        if (!cartItemsDiv || !cartIconCount || !cartTotal || !Total_Net || !cartItemCount)
            return;
        cartItemsDiv.innerHTML = '';
        let total = 0;
        let itemCount = 0;
        let cnt = 0;
        ListModelItems.forEach(item => {
            const itemDiv = document.createElement('div');
            itemDiv.classList.add('cart-item');
            itemDiv.innerHTML = `
            ${item.ItemName} - ر.س ${item.UnitPrice}  ${item.Quantity}X
            <button id="Removitems${cnt}" >❌</button>
        `;
            cartItemsDiv.appendChild(itemDiv);
            total += item.UnitPrice * item.Quantity;
            itemCount += item.Quantity;
            $('#Removitems' + cnt).on('click', function () {
                removeFromCart(item.ItemID, item.ItemUnitID);
            });
            cnt++;
        });
        cartTotal.innerText = total.toFixed(2);
        cartItemCount.innerText = itemCount.toString();
        cartIconCount.innerText = itemCount.toString();
        //Total_Net.innerText = ((total + Number($('#tax').val())) - Number($('#discount').val())).toFixed(2)
        $('#cart-icon').attr("Class", 'animate__animated animate__heartBeat');
        setTimeout(function () {
            $('#cart-icon').attr("Class", '');
        }, 300);
        ComputTotal();
    }
    function removeFromCart(itemId, ItemUnitID) {
        let itemIndex = null;
        // البحث عن الفهرس باستخدام حلقة for
        for (let i = 0; i < ListModelItems.length; i++) {
            if (ListModelItems[i].ItemID === itemId && ListModelItems[i].ItemUnitID === ItemUnitID) {
                itemIndex = i;
                break;
            }
        }
        // إذا لم يتم العثور على العنصر
        if (itemIndex === null)
            return;
        // تقليل الكمية أو إزالة العنصر
        if (ListModelItems[itemIndex].Quantity > 1) {
            ListModelItems[itemIndex].Quantity--;
        }
        else {
            ListModelItems.splice(itemIndex, 1);
        }
        UpdateItemInBasket();
    }
    function updateFinalPrice() {
        const discountInput = document.getElementById('discount');
        const taxInput = document.getElementById('tax');
        const cartTotalElement = document.getElementById('cart-total');
        const cart_Total_Net = document.getElementById('cart-totalNet');
        if (!discountInput || !taxInput || !cartTotalElement)
            return;
        const discount = parseFloat(discountInput.value) || 0;
        const tax = parseFloat(taxInput.value) || 0;
        const cartTotalValue = parseFloat(cartTotalElement.innerText) || 0;
        const totalAfterDiscount = cartTotalValue - discount;
        const finalPrice = totalAfterDiscount + (totalAfterDiscount * tax / 100);
        const finalPriceElement = document.getElementById('final-price');
        if (finalPriceElement) {
            finalPriceElement.innerText = finalPrice.toFixed(2);
        }
    }
    function closeInvoice() {
        const invoiceDiv = document.getElementById('invoice');
        if (invoiceDiv) {
            invoiceDiv.classList.remove('open');
        }
    }
    function toggleCart() {
        const cartDiv = document.getElementById('cart');
        if (cartDiv) {
            cartDiv.classList.toggle('open');
        }
    }
    function generateInvoice(TrNo, UUID, customerID, CustomerName, invoiceData) {
        var _a;
        const invoiceDiv = document.getElementById('invoice');
        const invoiceItemsDiv = document.getElementById('invoice-items');
        const invoiceCartTotal = document.getElementById('invoice-cart-total');
        const invoiceTotal = document.getElementById('invoice-total');
        const invoiceDesc = document.getElementById('invoice-Desc');
        const invoiceTax = document.getElementById('invoice-Tax');
        const invoiceNet = document.getElementById('invoice-Net');
        const invTypePay = document.getElementById('invoice-TypePay');
        const SalesMan = document.getElementById('invoice-SalesMan');
        const Assistant = document.getElementById('invoice-Assistant');
        debugger;
        if (customerID != null) {
            $('.Customer-info').removeClass('display_none');
            if (invoiceData.InvoiceTransCode == 1) {
                let CustomerData = GetDataFrom("D_Customer", 'CustomerId = ' + invoiceData.CustomerID + '');
                if (CustomerData.length > 0) {
                    $('#CustomerName').html("<strong>اسم الشركة : </strong>" + CustomerData[0].NAMEA);
                    $('#CustomerVatNo').html("<strong>الرقم الضريبي : </strong>" + CustomerData[0].VatNo);
                    $('#CustomerMobile').html("<strong>الموبايل : </strong>" + CustomerData[0].MOBILE);
                    $('#CustomerAddress').html("<strong>العنوان : </strong>" + CustomerData[0].Address_Street);
                }
                else {
                    $('#CustomerName').html("<strong>اسم الشركة : </strong>" + CustomerName);
                }
            }
            else {
                $('#CustomerName').html("<strong>اسم العميل : </strong>" + CustomerName);
            }
        }
        else {
            $('.Customer-info').addClass('display_none');
            $('#CustomerName').html("");
        }
        $('#InvCompName').html("<strong>اسم الشركة : </strong>" + SysSession.CurrentEnvironment.CompanyName);
        $('#InvVatNo').html("<strong>الرقم الضريبي : </strong>" + localStorage.getItem(GetParameterByName('App') + "VatNo"));
        $('#InvMobile').html("<strong>رقم الجوال : </strong>" + localStorage.getItem(GetParameterByName('App') + "Mobile"));
        $('#InvAdress').html("<strong>العنوان : </strong>" + localStorage.getItem(GetParameterByName('App') + "Address"));
        if (!invoiceDiv || !invoiceItemsDiv || !invoiceCartTotal || !invoiceTotal)
            return;
        invoiceItemsDiv.innerHTML = '';
        ListModelItems.forEach(item => {
            let Total = (item.Quantity * item.UnitPrice).toFixed(2);
            let vatprc = Number($('option:selected', $("#VatType")).attr('data-Prc'));
            let TotalwithVat = ((item.Quantity * item.UnitPrice) * vatprc / 100 + (item.Quantity * item.UnitPrice)).toFixed(2);
            const invoiceItemDiv = document.createElement('div');
            invoiceItemDiv.classList.add('invoice-item');
            invoiceItemDiv.innerHTML = `<div>
                                            <span>${item.ItemName}</span>
                                            <div class="item-details">
                                                <span>سعر:</span> ر.س ${item.UnitPrice}
                                                <span>كمية:</span> ${item.Quantity}
                                            </div>
                                        </div>
                                        <div class="total-per-item">الإجمالي: ر.س  ${TotalwithVat}</div>`;
            invoiceItemsDiv.appendChild(invoiceItemDiv);
        });
        $('');
        const cartTotalValue = ListModelItems.reduce((total, item) => total + (item.UnitPrice * item.Quantity), 0);
        const discount = parseFloat((_a = document.getElementById('discount')) === null || _a === void 0 ? void 0 : _a.value) || 0;
        const tax = Number($('option:selected', $("#VatType")).attr('data-Prc'));
        const totalAfterDiscount = cartTotalValue - discount;
        const totalWithTax = totalAfterDiscount + (totalAfterDiscount * tax / 100);
        invoiceCartTotal.innerText = cartTotalValue.toFixed(2);
        invoiceNet.innerText = totalWithTax.toFixed(2);
        invoiceDesc.innerText = discount.toFixed(2);
        invoiceTax.innerText = (totalAfterDiscount * tax / 100).toFixed(2);
        invoiceTotal.innerText = totalWithTax.toFixed(2);
        let Prc = 0;
        //if ($("#db_TypeFin ").val() == '1') {
        //    invTypePay.innerText = "Cash 💵"
        //}
        //else {
        invTypePay.innerText = $('option:selected', $("#Card_Type ")).text() + " % ( " + $('option:selected', $("#Card_Type")).attr('data-prc') + " ) ";
        Prc = Number($('option:selected', $("#Card_Type")).attr('data-prc'));
        //}
        SalesMan.innerText = "الفني  :   " + $('option:selected', $("#SalesManID ")).text();
        if ($('option:selected', $("#Assistant ")).text().trim() != '') {
            Assistant.innerText = "المساعد  :   " + $('option:selected', $("#Assistant ")).text();
        }
        let Due = (((Prc * totalWithTax) / 100) + totalWithTax).toFixed(2);
        invoiceTotal.innerText = Due;
        $("#CreateBy").html('<strong>اسم المنشئ:</strong> ' + SysSession.CurrentEnvironment.GQ_USERS.USER_NAME + '  ');
        $("#CreateAt").html('<strong>تاريخ الإصدار</strong> ' + formatDateTime(GetDateAndTimeSql()) + '  ');
        $("#TrNo").html('<strong>رقم الفاتورة:</strong> ' + TrNo + '  ');
        invoiceDiv.classList.add('open');
        ExtractText("invoice");
        //let OutPutExtract = $('#OutPutExtract').val()
        //CreateQRCode(OutPutExtract)
        //CreateQRCode(UUID)
        let CreateQrFormat = ` \r\n
        TrNo : ${TrNo} \r\n
        ---------------------------------- \r\n
        CreateBy : ${SysSession.CurrentEnvironment.GQ_USERS.USER_NAME} \r\n
        ---------------------------------- \r\n
        CreateAt : ${formatDateTime(GetDateAndTimeSql())} \r\n
        ---------------------------------- \r\n
        Total :  ${invoiceTotal.innerText} \r\n
        `;
        CreateQRCode(CreateQrFormat);
    }
    function ChackItemQty(itemId, ItemUnitID) {
        let SelectItem = ListModelItems.filter(x => x.ItemID == itemId);
        let QtySales = 0;
        for (var i = 0; i < SelectItem.length; i++) {
            QtySales = QtySales + (SelectItem[i].Quantity * SelectItem[i].Rate);
        }
        let ItemQty = _GetItemInfo.filter(x => x.ItemUnitID == ItemUnitID && x.IsService == false);
        if (ItemQty.length > 0) {
            let QtyStock = ItemQty[0].OneHandQuantity;
            let Rate = ItemQty[0].Rate;
            if ((QtySales + Rate) > QtyStock) {
                ShowMessage('😒 There is not enough quantity of ( ' + ItemQty[0].ItemName + ' ) in stock for sale', '😒 لا يوجد كميه كافية من ( ' + ItemQty[0].ItemName + ' ) في المخزن للبيع');
                return false;
            }
        }
        return true;
    }
    function Clear() {
        ListModelItems = new Array();
        UpdateItemInBasket();
        discount.value = '0';
        DiscountPrc.value = '0';
        tax.value = '0';
        db_TypeFin.value = '1';
        Card_Type.selectedIndex = 0;
        SalesManID.selectedIndex = 0;
        db_TypeFin_onchange();
        ComputTotal();
        $('#cart-icon').click();
        $('#txtCustomerID').val(0);
        $('#BtnNameCustomer').html(Res.Lang == "Ar" ? "ابحث عن العميل" : "Search Customer");
        VatType.selectedIndex = 0;
        VatType_onchange();
    }
    function Assign() {
        let ModelMaster = new I_TR_Sales();
        ModelMaster.SaleID = GlopID;
        let Prc = 0;
        ModelMaster.IsCash = db_TypeFin.value == '1' ? true : false;
        //if (db_TypeFin.value == '1') {
        //    ModelMaster.CashType = null
        //}
        //else {
        ModelMaster.CashType = Number(Card_Type.value);
        Prc = Number($('option:selected', $("#Card_Type")).attr('data-prc'));
        //}
        ModelMaster.CompCode = CompCode;
        //ModelMaster.DocUUID = GenerateUUID();
        ModelMaster.TrType = 0;
        ModelMaster.TrNo = 0;
        ModelMaster.TaxStatus = -1;
        ModelMaster.TaxErrorCode = 0;
        ModelMaster.InvoiceTransCode = 2;
        let totalAfterDiscount = Number($('#cart-total').text()) - Number(discount.value);
        ModelMaster.ItemsTotal = Number($('#cart-total').text());
        ModelMaster.Discount = Number(discount.value);
        ModelMaster.TotalAmount = totalAfterDiscount;
        ModelMaster.VatAmount = ((totalAfterDiscount * Number(tax.value)) / 100);
        ModelMaster.ChargePrc = Prc;
        let Due = (((Prc * Number($('#cart-totalNet').text())) / 100) + Number($('#cart-totalNet').text())).toFixed(2);
        ModelMaster.PaymentAmount = Number(Due);
        ModelMaster.SaleDate = GetDate();
        ModelMaster.TrTime = GetTimeNumber();
        ModelMaster.CustomerID = Number($('#txtCustomerID').val()) == 0 ? null : Number($('#txtCustomerID').val());
        ModelMaster.CustomerName = Number($('#txtCustomerID').val()) == 0 ? "عميل نقدي عام" : $('#BtnNameCustomer').html();
        ModelMaster.VatTypeID = Number($('#VatType').val());
        ModelMaster.IDUserCreate = SysSession.CurrentEnvironment.GQ_USERS.ID;
        ModelMaster.CreatedAt = GetDateAndTimeSql();
        ModelMaster.CreatedBy = SysSession.CurrentEnvironment.GQ_USERS.USER_NAME;
        debugger;
        if (ModelMaster.CustomerID !== null && ModelMaster.CustomerID !== 0) {
            ModelMaster.InvType = 2;
            ModelMaster.Status = 0;
            ModelMaster.SalesManID = 0;
            ModelMaster.SalesManName = null;
            ModelMaster.SalesManMobile = null;
        }
        else {
            ModelMaster.Status = 1;
            ModelMaster.InvType = 1;
            ModelMaster.SalesManID = Number(SalesManID.value);
            ModelMaster.SalesManName = $('option:selected', $("#SalesManID ")).text();
            ModelMaster.SalesManMobile = $('option:selected', $("#Assistant ")).text();
            for (var i = 0; i < ListModelItems.length; i++) {
                let Remarks = ` الفني : ${ModelMaster.SalesManName} 
			               عمل : ${ListModelItems[i].ItemName}  `;
                ModelMaster.Remarks = Remarks;
            }
        }
        _MasterDetails.Master = ModelMaster;
        AssignDetails();
        _MasterDetails.Details = ListModelItems;
    }
    function Vaild() {
        if (ListModelItems.length == 0) {
            ShowMessage('Please enter invoice details 😁', 'برجاء ادخال تفاصيل الفاتوره 😁');
            return false;
        }
        return true;
    }
    function Insert(FlagPrint = false) {
        if (!Vaild()) {
            return;
        }
        Assign();
        Ajax.CallsyncSave({
            type: "POST",
            url: sys.apiUrl("TrSales", "Insert"),
            data: JSON.stringify({ DataSend: JSON.stringify(_MasterDetails) }),
            success: (d) => {
                let result = d;
                if (result.IsSuccess == true) {
                    let res = result.Response;
                    //$('#Back_Page').click();
                    //$("#Display_Back_Page").click();
                    generateInvoice(res.TrNo, res.DocUUID, res.CustomerID, res.CustomerName, res);
                    //CreateQRCode(res.QRCode);
                    ShowMessage("Done 🤞😉", "تم الاضافه 🤞😉");
                    setTimeout(function () {
                        RefrashDataItems();
                    }, 500);
                    setTimeout(function () {
                        let QR = encodeToBase64($('#IDUtf8Text').val());
                        SqlExecuteQuery("update I_TR_Sales set QRCode = N'" + QR + "' where SaleID = " + res.SaleID);
                    }, 1000);
                    Clear();
                    Close_Loder();
                    if (FlagPrint) {
                        setTimeout(function () {
                            PrintInvSlipVer3("invoice");
                        }, 500);
                    }
                    setTimeout(function () {
                        $('#CloseInv').click();
                        //location.reload();
                    }, 4000);
                }
                else {
                }
            }
        });
    }
    function GetOrder_onclick() {
        GetCounter();
    }
    function ZeroCount_onclick() {
        let Res = confirm("هل تريد تصفير الحجزات");
        if (Res) {
            SqlExecuteQuery("Update G_TransCounter set LastSerial = 1 where CompCode = " + CompCode + " and TransType = 'CntBarber'");
            DisplayCounter();
        }
    }
    function GetCounter() {
        debugger;
        let Counter = 0;
        let Trns = GetDataFrom("G_TransCounter", "CompCode = " + CompCode + " and TransType = 'CntBarber'");
        if (Trns.length > 0) {
            Counter = Trns[0].LastSerial;
            //alert(Counter);
            const TrNoCNT = document.getElementById('TrNoCNT');
            TrNoCNT.innerText = Counter.toString();
            GetOrder.innerHTML = "حجز دور :  " + (Counter + 1).toString();
            setTimeout(function () {
                PrintInvSlipVer3("invoiceCNT");
                SqlExecuteQuery("Update G_TransCounter set LastSerial = LastSerial + 1 where CompCode = " + CompCode + " and TransType = 'CntBarber'");
            }, 200);
        }
    }
    function DisplayCounter() {
        let Counter = 0;
        let Trns = GetDataFrom("G_TransCounter", "CompCode = " + CompCode + " and TransType = 'CntBarber'");
        if (Trns.length > 0) {
            Counter = Trns[0].LastSerial;
            //alert(Counter);
            const TrNoCNT = document.getElementById('TrNoCNT');
            TrNoCNT.innerText = Counter.toString();
            GetOrder.innerHTML = "حجز دور :  " + (Counter).toString();
        }
    }
    function ComputAmountPaid() {
        debugger;
        let AmountPaid = Number($('#AmountPaid').val());
        let totalDue = Number($('#cart-totalDue').text());
        let RemainingAmount = Number(AmountPaid - totalDue);
        $('#RemainingAmount').val(RemainingAmount);
    }
})(TR_Sales || (TR_Sales = {}));
//# sourceMappingURL=TR_Sales.js.map