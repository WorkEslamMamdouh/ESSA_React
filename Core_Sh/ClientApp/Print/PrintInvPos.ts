
$(document).ready(() => {
    PrintInvPos.InitalizeComponent();
});

namespace PrintInvPos {
    var sys: SystemTools = new SystemTools();
    var SysSession: SystemSession = GetSystemSession();
    var _USER: Array<G_USERS> = new Array<G_USERS>();


    var _Print_Invoice: HTMLButtonElement;

    var ItemTotal = 0;
    var ItemCount = 0;
    var InvoiceID = 0;
    var InvoiceNote = 0;

    export function InitalizeComponent() {

        console.log(SysSession.CurrentEnvironment)

        let _USERS = SysSession.CurrentEnvironment.GQ_USERS;


        InitalizeControls();
        InitializeEvents();
        let data: IQ_TR_Sales = GetModelGlopel();
        Display_Inv(data.SaleID);
        Close_Loder();

    }
    function InitalizeControls() {

        _Print_Invoice = document.getElementById("_Print_Invoice") as HTMLButtonElement;

    }
    function InitializeEvents() {
        _Print_Invoice.onclick = _Print_Invoice_onclick;

    }
    function Display_Inv(SaleID: number) {
        var Table: Array<Table>;
        Table =
            [
                { NameTable: 'IQ_TR_Sales', Condition: "  SaleID =  " + SaleID },
                { NameTable: 'IQ_TR_SaleDetails', Condition: "  SaleID =  " + SaleID },

            ]
        DataResult(Table);
        //**************************************************************************************************************

        let _IQ_TR_Sales = GetDataTable('IQ_TR_Sales');
        let _IQ_TR_SaleDetails = GetDataTable('IQ_TR_SaleDetails');

        Create_Invoice_Print(_IQ_TR_Sales[0], _IQ_TR_SaleDetails)
    }

    function Create_Invoice_Print(_IQ_TR_Sales: IQ_TR_Sales, _IQ_TR_SaleDetails: Array<IQ_TR_SaleDetails>): void {

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
        debugger
        if (_IQ_TR_Sales.CustomerID != null) {
            $('.Customer-info').removeClass('display_none');
            if (_IQ_TR_Sales.InvoiceTransCode == 1) {
                let CustomerData: Array<D_Customer> = GetDataFrom("D_Customer", 'CustomerId = ' + _IQ_TR_Sales.CustomerID + '');
                if (CustomerData.length > 0) {
                    $('#CustomerName').html("<strong>اسم الشركة : </strong>" + CustomerData[0].NAMEA);
                    $('#CustomerVatNo').html("<strong>الرقم الضريبي : </strong>" + CustomerData[0].VatNo);
                    $('#CustomerMobile').html("<strong>الموبايل : </strong>" + CustomerData[0].MOBILE);
                    $('#CustomerAddress').html("<strong>العنوان : </strong>" + CustomerData[0].Address_Street);
                } else {
                    $('#CustomerName').html("<strong>اسم الشركة : </strong>" + _IQ_TR_Sales.CustomerName);

                }
            } else {
                $('#CustomerName').html("<strong>اسم العميل : </strong>" + _IQ_TR_Sales.CustomerName);
            }

        } else {
            $('.Customer-info').addClass('display_none');
            $('#CustomerName').html("");
        }


        $('#InvCompName').html("<strong>اسم الشركة : </strong>" + SysSession.CurrentEnvironment.CompanyName);
        $('#InvVatNo').html("<strong>الرقم الضريبي : </strong>" + localStorage.getItem(GetParameterByName('App') + "VatNo"));
        $('#InvMobile').html("<strong>رقم الجوال : </strong>" + localStorage.getItem(GetParameterByName('App') + "Mobile"));
        $('#InvAdress').html("<strong>العنوان : </strong>" + localStorage.getItem(GetParameterByName('App') + "Address"));

        if (!invoiceDiv || !invoiceItemsDiv || !invoiceCartTotal || !invoiceTotal) return;

        invoiceItemsDiv.innerHTML = '';
        _IQ_TR_SaleDetails.forEach(item => {

            let Total = (item.Quantity * item.UnitPrice).toFixed(2);

            const invoiceItemDiv = document.createElement('div');
            invoiceItemDiv.classList.add('invoice-item');
            invoiceItemDiv.innerHTML = `<div>
                                            <span>${item.ItemName}</span>
                                            <div class="item-details">
                                                <span>سعر:</span>  ${item.UnitPrice}	 ر.س
                                                <span>كمية:</span> ${item.Quantity}
                                            </div>
                                        </div>
                                        <div class="total-per-item">الإجمالي:  ${Total} ر.س</div>`;



            invoiceItemsDiv.appendChild(invoiceItemDiv);
        });



        invoiceCartTotal.innerText = _IQ_TR_Sales.ItemsTotal.toFixed(2)
        invoiceDesc.innerText = _IQ_TR_Sales.Discount.toFixed(2)
        invoiceTax.innerText = _IQ_TR_Sales.VatAmount.toFixed(2) //(totalAfterDiscount * tax / 100).toFixed(2)
        invoiceNet.innerText = (_IQ_TR_Sales.TotalAmount + _IQ_TR_Sales.VatAmount).toFixed(2)
        invoiceTotal.innerText = _IQ_TR_Sales.NetAmount.toFixed(2)

        invTypePay.innerText = _IQ_TR_Sales.DescPayType + " % ( " + _IQ_TR_Sales.ChargePrc + " ) "
        SalesMan.innerText = "الفني  :   " + _IQ_TR_Sales.SalesManName;
        if (_IQ_TR_Sales.SalesManMobile.trim() != '') { 
            Assistant.innerText = "المساعد  :   " + _IQ_TR_Sales.SalesManMobile;
        }

        $("#CreateBy").html('<strong>اسم المنشئ:</strong> ' + _IQ_TR_Sales.CreatedBy + '  ')
        $("#CreateAt").html('<strong>تاريخ الإصدار</strong> ' + formatDateTime(_IQ_TR_Sales.CreatedAt) + '  ')
        $("#TrNo").html('<strong>رقم الفاتورة:</strong> ' + _IQ_TR_Sales.TrNo + '  ')

        invoiceDiv.classList.add('open');


        ExtractText("invoice")

        //let OutPutExtract = $('#OutPutExtract').val()

        //CreateQRCode(OutPutExtract)
        //CreateQRCode(_IQ_TR_Sales.DocUUID)

        let CreateQrFormat = `\r\n
TrNo : ${_IQ_TR_Sales.TrNo}  \r\n
---------------------------------- \r\n
CreateBy : ${_IQ_TR_Sales.CreatedBy} \r\n
---------------------------------- \r\n
CreateAt : ${formatDateTime(_IQ_TR_Sales.CreatedAt)} \r\n
---------------------------------- \r\n
Total : ${invoiceTotal.innerText} \r\n`;

        //CreateQRCode(CreateQrFormat);
        CreateQRCode(_IQ_TR_Sales.QRCode);

    }



    function _Print_Invoice_onclick() {
        PrintInvSlipVer3("invoice")
        //printDiv('Body_Print_Inv')
    }



}
