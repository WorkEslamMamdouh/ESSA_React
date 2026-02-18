
CREATE TABLE [dbo].[Z_G_Lnk_Create_DirectJournal](
	[ID_Lnk] [int] IDENTITY(1,1) NOT NULL,
	[CompCode] [int] NULL,
	[KeyTrans] [nvarchar](200) NULL,
	[NameTableMaster] [nvarchar](200) NULL,
	[NameFelidMasterID] [nvarchar](200) NULL,
	[NameFelidCondtionDate] [nvarchar](200) NULL,
	[NameFelidCondtionCustom] [nvarchar](200) NULL,
	[IsActive] [bit] NULL,
 CONSTRAINT [PK_G_Lnk_Create_JournalDirect] PRIMARY KEY CLUSTERED 
(
	[ID_Lnk] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO



CREATE TABLE [dbo].[Z_G_Lnk_Build_DetailJournal](
	[ID_Build] [int] IDENTITY(1,1) NOT NULL,
	[CompCode] [int] NULL,
	[KeyTrans] [nvarchar](200) NULL,
	[DescA_FelidLnk] [nvarchar](200) NULL,
	[IsOutFelidTable] [bit] NULL,
	[NameFelidForeignKeyInTable_Lnk] [nvarchar](200) NULL,
	[NameOutTableGetData] [nvarchar](200) NULL,
	[NamePrimaryKeyOutTable] [nvarchar](200) NULL,
	[NameFelidAcc] [nvarchar](200) NULL,
	[NameFelidAmount_InTableLnk] [nvarchar](200) NULL,
	[IsCredit] [bit] NULL,
	[NameFelidRemarks] [nvarchar](200) NULL,
	[IsActive] [bit] NULL,
 CONSTRAINT [PK_G_Lnk_Build_DetJournal] PRIMARY KEY CLUSTERED 
(
	[ID_Build] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO




  
 -- Z_G_Create_DirectJournal 1,'Inv',157
Create PROCEDURE [dbo].[Z_G_Create_DirectJournal]
	@CompCode int, 
	@KeyTrans nvarchar(200),
	@TranID int 
AS
BEGIN


   SET NOCOUNT ON; 

	Declare  @SqlJournal nvarchar(4000)  , @sql nvarchar(4000)  , @sqlOutTable nvarchar(4000)  , @SqlOutTableSelectACC_CODE nvarchar(4000)  ,  @Ser INT = 1  , @Debit NVARCHAR(200) , @Credit NVARCHAR(200);
	DECLARE  @NameTableMaster nvarchar(200) , @NameFelidMasterID nvarchar(200)
	DECLARE @ID_Build INT,@DescA_FelidLnk NVARCHAR(200),@NameFelidRemarks NVARCHAR(200), @IsOutFelidTable BIT,@NameFelidForeignKeyInTable_Lnk NVARCHAR(200),@NameOutTableGetData NVARCHAR(200),@NamePrimaryKeyOutTable NVARCHAR(200),@NameFelidAcc NVARCHAR(200),@NameFelidAmount_InTableLnk NVARCHAR(200),@IsCredit BIT,@IsActive BIT;
	 
	 
		Select @NameTableMaster = NameTableMaster  ,@NameFelidMasterID = NameFelidMasterID from Z_G_Lnk_Create_DirectJournal where  KeyTrans = @KeyTrans and  CompCode = @CompCode and IsActive = 1 


		

		--set @SQl = ' Select * from ' +   (@NameTableMaster) + ' where ' +   (@NameFelidMasterID)  + ' = ' +    str(@TranID)  
		--print @SQl
		--exec (@SQL) 




		 --***********************************-- تعريف الكيرسور********************************************


		
		DECLARE detail_cursor CURSOR FOR
		SELECT [ID_Build],[DescA_FelidLnk],[NameFelidRemarks],[IsOutFelidTable],[NameFelidForeignKeyInTable_Lnk],[NameOutTableGetData],[NamePrimaryKeyOutTable],[NameFelidAcc],[NameFelidAmount_InTableLnk],[IsCredit],[IsActive]
		FROM [dbo].[Z_G_Lnk_Build_DetailJournal]
		WHERE KeyTrans = @KeyTrans AND CompCode = @CompCode AND IsActive = 1;

					-- فتح الكيرسور
					OPEN detail_cursor;

					-- قراءة أول سجل
					FETCH NEXT FROM detail_cursor INTO 
						@ID_Build,@DescA_FelidLnk,@NameFelidRemarks, @IsOutFelidTable,@NameFelidForeignKeyInTable_Lnk,@NameOutTableGetData,@NamePrimaryKeyOutTable,@NameFelidAcc,@NameFelidAmount_InTableLnk,@IsCredit,@IsActive;

							-- التكرار على كل السجلات
							WHILE @@FETCH_STATUS = 0
							BEGIN

							--*********************************BEGIN Cursor **********************************************
							 
							 if	@IsCredit = 1
								 BEGIN
									Set @Credit = (@NameFelidAmount_InTableLnk)
									Set @Debit = '0.00'
								 End
							 Else
								 BEGIN
							 		Set @Credit = '0.00'
									Set @Debit = (@NameFelidAmount_InTableLnk)
								 End


								 	 
							 if	@IsOutFelidTable = 0
								 BEGIN
									 
									 		set @SQl = ' Select '+ str( @Ser )+' as Ser , N'''+  ( @DescA_FelidLnk )+''' as DescATrans , '+ str( @CompCode )+' as CompCode , '+@NameFelidAcc+' as ACC_CODE , '+ ( @Debit) +' as Debit ,  '+ ( @Credit )+' as Credit ,  '+(@NameFelidRemarks)+' as Remarks ,  '''+ ( @KeyTrans )+''' as KeyTrans  ,  '+ str( @TranID )+' as TranID   from ' +   (@NameTableMaster) + ' where ' +   (@NameFelidMasterID)  + ' = ' +    str(@TranID)  		  

								 End
							 Else
								 BEGIN
							 		

									 set @SqlOutTableSelectACC_CODE = ' Select   '+@NamePrimaryKeyOutTable+' as TableOutID    from ' +   (@NameTableMaster) + ' where ' +   (@NameFelidMasterID)  + ' = ' +    str(@TranID)  


									 set @sqlOutTable = 'Select '+ @NameFelidAcc +' from '+@NameOutTableGetData+' where ' +@NamePrimaryKeyOutTable + ' in ( '+@SqlOutTableSelectACC_CODE+' ) '

		 
								     set @SQl = ' Select '+ str( @Ser )+' as Ser , N'''+  ( @DescA_FelidLnk )+''' as DescATrans  , '+ str( @CompCode )+' as CompCode , ( '+@sqlOutTable+' ) as ACC_CODE , '+ ( @Debit) +' as Debit ,  '+ ( @Credit )+' as Credit ,  '+(@NameFelidRemarks)+' as Remarks ,  '''+ ( @KeyTrans )+''' as KeyTrans  ,  '+ str( @TranID )+' as TranID   from ' +   (@NameTableMaster) + ' where ' +   (@NameFelidMasterID)  + ' = ' +    str(@TranID)  
		


								 End


								--print @SQl
								 
							if	@Ser = 1
								 BEGIN
									 set @SqlJournal = @SQl;
								 End
								 else
								  BEGIN
									set @SqlJournal = @SqlJournal + CHAR(13) + CHAR(10) + 'union all' + CHAR(13) + CHAR(10) + @SQL;
								 End




								--print @SqlJournal



							

								set  @Ser = @Ser + 1
							--*********************************End Cursor **********************************************
								-- قراءة السجل التالي
								FETCH NEXT FROM detail_cursor INTO 
									@ID_Build,@DescA_FelidLnk,@NameFelidRemarks , @IsOutFelidTable,@NameFelidForeignKeyInTable_Lnk,@NameOutTableGetData,@NamePrimaryKeyOutTable,@NameFelidAcc,@NameFelidAmount_InTableLnk,@IsCredit,@IsActive;
							END

		-- إغلاق الكيرسور
		CLOSE detail_cursor;
		DEALLOCATE detail_cursor;


		print @SqlJournal
		exec (@SqlJournal) 



		



		 
END




Go




--SELECT exec(dbo.Z_FN_Build_DirectJournalSQL(1, 'Inv', 157)) AS GeneratedSQL;
 
--SELECT exec(dbo.Z_FN_Build_DirectJournalSQL(1, 'Inv', 157)) AS GeneratedSQL;

Create FUNCTION dbo.Z_FN_Build_DirectJournalSQL
(
    @CompCode INT,
    @KeyTrans NVARCHAR(200),
    @TranID INT
)
RETURNS NVARCHAR(MAX)
AS
BEGIN



    DECLARE 
        @SqlJournal NVARCHAR(MAX) = '',
        @sql NVARCHAR(MAX),
        @sqlOutTable NVARCHAR(MAX),
        @SqlOutTableSelectACC_CODE NVARCHAR(MAX),
        @Ser INT = 1,
        @Debit NVARCHAR(200),
        @Credit NVARCHAR(200),
        @NameTableMaster NVARCHAR(200),
        @NameFelidMasterID NVARCHAR(200),
        @ID_Build INT,
        @DescA_FelidLnk NVARCHAR(200),
        @NameFelidRemarks NVARCHAR(200),
        @IsOutFelidTable BIT,
        @NameFelidForeignKeyInTable_Lnk NVARCHAR(200),
        @NameOutTableGetData NVARCHAR(200),
        @NamePrimaryKeyOutTable NVARCHAR(200),
        @NameFelidAcc NVARCHAR(200),
        @NameFelidAmount_InTableLnk NVARCHAR(200),
        @IsCredit BIT,
        @IsActive BIT

    -- Get Master Table Info
    SELECT 
        @NameTableMaster = NameTableMaster,
        @NameFelidMasterID = NameFelidMasterID 
    FROM Z_G_Lnk_Create_DirectJournal 
    WHERE KeyTrans = @KeyTrans AND CompCode = @CompCode AND IsActive = 1

    -- Cursor Simulation using WHILE
    DECLARE cur CURSOR FOR
    SELECT [ID_Build],[DescA_FelidLnk],[NameFelidRemarks],[IsOutFelidTable],
           [NameFelidForeignKeyInTable_Lnk],[NameOutTableGetData],[NamePrimaryKeyOutTable],
           [NameFelidAcc],[NameFelidAmount_InTableLnk],[IsCredit],[IsActive]
    FROM [dbo].[Z_G_Lnk_Build_DetailJournal]
    WHERE KeyTrans = @KeyTrans AND CompCode = @CompCode AND IsActive = 1

    OPEN cur
    FETCH NEXT FROM cur INTO 
        @ID_Build,@DescA_FelidLnk,@NameFelidRemarks,@IsOutFelidTable,
        @NameFelidForeignKeyInTable_Lnk,@NameOutTableGetData,@NamePrimaryKeyOutTable,
        @NameFelidAcc,@NameFelidAmount_InTableLnk,@IsCredit,@IsActive

    WHILE @@FETCH_STATUS = 0
    BEGIN
        -- Debit & Credit Assignment
        IF @IsCredit = 1
        BEGIN
            SET @Credit ='isnull(' +  @NameFelidAmount_InTableLnk + ', 0.00 )'
            SET @Debit = '0.00'
        END
        ELSE
        BEGIN
            SET @Credit = '0.00'
            SET @Debit = 'isnull('  + @NameFelidAmount_InTableLnk + ', 0.00 )'
        END

        -- SQL Generation
        IF @IsOutFelidTable = 0
        BEGIN
            SET @SQL = 'SELECT ' + CAST(@Ser AS NVARCHAR) + ' AS Ser, N''' + @DescA_FelidLnk + ''' AS DescATrans, ' + 
                        CAST(@CompCode AS NVARCHAR) + ' AS CompCode, isnull( ' + @NameFelidAcc + ' , '''') AS ACC_CODE, ' +
                        @Debit + ' AS Debit, ' + @Credit + ' AS Credit, ' + @NameFelidRemarks + ' AS Remarks, ''' +
                        @KeyTrans + ''' AS KeyTrans, ' + CAST(@TranID AS NVARCHAR) + ' AS TranID FROM ' + @NameTableMaster +
                        ' WHERE ' + @NameFelidMasterID + ' = ' + CAST(@TranID AS NVARCHAR)
        END
        ELSE
        BEGIN
            SET @SqlOutTableSelectACC_CODE = 'SELECT ' + @NamePrimaryKeyOutTable + ' AS TableOutID FROM ' +
                                              @NameTableMaster + ' WHERE ' + @NameFelidMasterID + ' = ' + CAST(@TranID AS NVARCHAR)

            SET @sqlOutTable = 'SELECT ' + @NameFelidAcc + ' FROM ' + @NameOutTableGetData + 
                               ' WHERE ' + @NamePrimaryKeyOutTable + ' IN (' + @SqlOutTableSelectACC_CODE + ')'

            SET @SQL = 'SELECT ' + CAST(@Ser AS NVARCHAR) + ' AS Ser, N''' + @DescA_FelidLnk + ''' AS DescATrans, ' + 
                        CAST(@CompCode AS NVARCHAR) + ' AS CompCode,  isnull( (' + @sqlOutTable + '),'''') AS ACC_CODE, ' +
                        @Debit + ' AS Debit, ' + @Credit + ' AS Credit, ' + @NameFelidRemarks + ' AS Remarks, ''' +
                        @KeyTrans + ''' AS KeyTrans, ' + CAST(@TranID AS NVARCHAR) + ' AS TranID FROM ' + @NameTableMaster +
                        ' WHERE ' + @NameFelidMasterID + ' = ' + CAST(@TranID AS NVARCHAR)
        END

        IF @Ser = 1
        BEGIN
            SET @SqlJournal = @SQL
        END
        ELSE
        BEGIN
            SET @SqlJournal = @SqlJournal + CHAR(13) + CHAR(10) + 'UNION ALL' + CHAR(13) + CHAR(10) + @SQL
        END

        SET @Ser = @Ser + 1

        FETCH NEXT FROM cur INTO 
            @ID_Build,@DescA_FelidLnk,@NameFelidRemarks,@IsOutFelidTable,
            @NameFelidForeignKeyInTable_Lnk,@NameOutTableGetData,@NamePrimaryKeyOutTable,
            @NameFelidAcc,@NameFelidAmount_InTableLnk,@IsCredit,@IsActive
    END

    CLOSE cur
    DEALLOCATE cur

    RETURN @SqlJournal
END


GO



-- جدول الاستقبال
--CREATE TABLE JournalResult (
--    Ser INT,
--    DescATrans NVARCHAR(200),
--    CompCode INT,
--    ACC_CODE NVARCHAR(50),
--    Debit DECIMAL(18,2),
--    Credit DECIMAL(18,2),
--    Remarks NVARCHAR(500),
--    KeyTrans NVARCHAR(50),
--    TranID INT
--)

-- البروسيجر اللي ينفذ الـ SQL ويرميه في الجدول

--select * From JournalResult
--GenerateDirectJournal 1,'Inv',157
 Create PROCEDURE dbo.Z_G_GenerateJournal
    @CompCode INT,
    @KeyTrans NVARCHAR(200),
    @TranID INT
AS
BEGIN
    SET NOCOUNT ON; 

    DECLARE @SqlToExecute NVARCHAR(MAX) = 'INSERT INTO #JournalResultTemp '
    DECLARE @Sql NVARCHAR(MAX)

    -- بناء نص الإدخال الديناميكي
    SET @Sql = dbo.Z_FN_Build_DirectJournalSQL(@CompCode, @KeyTrans, @TranID)
    SET @SqlToExecute = @SqlToExecute + CHAR(13) + CHAR(10) + @Sql;

    -- تنفيذ النص
    EXEC(@SqlToExecute)
END

Go

 --[Z_G_GenerateDirectJournal] 1,'Inv',1,0,'2024-01-01','2026-05-08',''
 Create PROCEDURE [dbo].[Z_G_GenerateDirectJournal]
    @CompCode INT, 
    @KeyTrans NVARCHAR(200), -- مثال: 'Inv,Rest'
    @TrTypeCondation INT,    -- 0: By TransID, 1: By Date, 2: By CustomCondition
    @TransID INT,
    @FromDate NVARCHAR(50),
    @ToDate NVARCHAR(50),
    @CustomCondation NVARCHAR(MAX)
AS
BEGIN
    SET NOCOUNT ON;

    DECLARE 
        @CurrKeyTrans NVARCHAR(200),
        @NameTableMaster NVARCHAR(200), 
        @NameFelidMasterID NVARCHAR(200), 
        @NameFelidCondtionDate NVARCHAR(200),
        @NameFelidCondtionCustom NVARCHAR(200),
        @SQL NVARCHAR(MAX),
        @DynamicSQL NVARCHAR(MAX)

    -- إنشاء الجدول المؤقت
    IF OBJECT_ID('tempdb..#JournalResultTemp') IS NOT NULL
        DROP TABLE #JournalResultTemp;

    CREATE TABLE #JournalResultTemp (
        Ser INT,
        DescATrans NVARCHAR(200),
        CompCode INT,
        ACC_CODE NVARCHAR(50),
        Debit DECIMAL(18,2),
        Credit DECIMAL(18,2),
        Remarks NVARCHAR(500),
        KeyTrans NVARCHAR(50),
        TranID INT
    );

    -- تقسيم قيم KeyTrans
    DECLARE @KeyTransList TABLE (KeyTrans NVARCHAR(200));
    INSERT INTO @KeyTransList (KeyTrans)
    SELECT LTRIM(RTRIM(Split.a.value('.', 'NVARCHAR(200)')))
    FROM  
    (
        SELECT CAST('<X>' + REPLACE(@KeyTrans, ',', '</X><X>') + '</X>' AS XML) AS String
    ) AS A
    CROSS APPLY String.nodes('/X') AS Split(a);

    -- كيرسر للتنقل بين KeyTrans
    DECLARE cur_KeyTrans CURSOR FOR 
    SELECT KeyTrans FROM @KeyTransList;

    OPEN cur_KeyTrans;
    FETCH NEXT FROM cur_KeyTrans INTO @CurrKeyTrans;

    WHILE @@FETCH_STATUS = 0
    BEGIN
        -- استرجاع بيانات الجدول المطلوب
        SELECT 
            @NameTableMaster = NameTableMaster,
            @NameFelidMasterID = NameFelidMasterID,
            @NameFelidCondtionDate = NameFelidCondtionDate,
            @NameFelidCondtionCustom = NameFelidCondtionCustom
        FROM Z_G_Lnk_Create_DirectJournal 
        WHERE KeyTrans = @CurrKeyTrans AND CompCode = @CompCode AND IsActive = 1;

        -- لو مش موجود، تجاهله
        IF @NameTableMaster IS NULL
        BEGIN
            FETCH NEXT FROM cur_KeyTrans INTO @CurrKeyTrans;
            CONTINUE;
        END

        -- بناء الاستعلام الديناميكي حسب نوع الفلترة
        IF @TrTypeCondation = 0
        BEGIN
            SET @SQL = N'SELECT ' + QUOTENAME(@NameFelidMasterID) + ' AS TransID FROM ' 
                        + QUOTENAME(@NameTableMaster) + ' WHERE ' 
                        + QUOTENAME(@NameFelidMasterID) + ' = ' + CAST(@TransID AS NVARCHAR);
        END
        ELSE IF @TrTypeCondation = 1
        BEGIN
            SET @SQL = N'SELECT ' + QUOTENAME(@NameFelidMasterID) + ' AS TransID FROM ' 
                        + QUOTENAME(@NameTableMaster) + ' WHERE ' 
                        + QUOTENAME(@NameFelidCondtionDate) + ' >= ''' + @FromDate + ''' AND ' 
                        + QUOTENAME(@NameFelidCondtionDate) + ' <= ''' + @ToDate + ''' AND CompCode = ' + CAST(@CompCode AS NVARCHAR);
        END
        ELSE IF @TrTypeCondation = 2
        BEGIN
            SET @SQL = N'SELECT ' + QUOTENAME(@NameFelidMasterID) + ' AS TransID FROM ' 
                        + QUOTENAME(@NameTableMaster) + ' WHERE ' 
                        + @NameFelidCondtionCustom + ' = ''' + @CustomCondation + '''';
        END

        -- تنفيذ الكيرسر الديناميكي
        SET @DynamicSQL = N'
            DECLARE @TransIDFromCursor INT;

            DECLARE cursorTransID CURSOR FOR 
            ' + @SQL + N';

            OPEN cursorTransID;
            FETCH NEXT FROM cursorTransID INTO @TransIDFromCursor;

            WHILE @@FETCH_STATUS = 0
            BEGIN
                EXEC Z_G_GenerateJournal ' + CAST(@CompCode AS NVARCHAR) + ', ''' + @CurrKeyTrans + ''', @TransIDFromCursor;
                FETCH NEXT FROM cursorTransID INTO @TransIDFromCursor;
            END

            CLOSE cursorTransID;
            DEALLOCATE cursorTransID;
        ';

        EXEC sp_executesql @DynamicSQL;

        -- إعادة تعيين المتغيرات
        SET @NameTableMaster = NULL;
        SET @NameFelidMasterID = NULL;
        SET @NameFelidCondtionDate = NULL;
        SET @NameFelidCondtionCustom = NULL;

        FETCH NEXT FROM cur_KeyTrans INTO @CurrKeyTrans;
    END

    CLOSE cur_KeyTrans;
    DEALLOCATE cur_KeyTrans;

    -- عرض النتيجة النهائية
    SELECT  
        ROW_NUMBER() OVER (ORDER BY TranID) AS Ser,
        DescATrans,
        CompCode,
        ACC_CODE,
        Debit,
        Credit,
        Remarks,
        KeyTrans,
        TranID 
    FROM #JournalResultTemp;
END



  --EXEC [Z_G_GenerateDirectJournal] 
  --  @CompCode = 1,
  --  @KeyTrans = 'Inv,Pur',
  --  @TrTypeCondation = 1,
  --  @TransID = 200,
  --  @FromDate = '2025-01-01',
  --  @ToDate = '2025-06-01',
  --  @CustomCondation = '1';


  go

  INSERT INTO Z_G_Lnk_Create_DirectJournal ( 
    CompCode,
    KeyTrans,
    NameTableMaster,
    NameFelidMasterID,
    NameFelidCondtionDate,
    NameFelidCondtionCustom,
    IsActive
)
VALUES 
( 1, 'Inv', 'I_TR_Sales', 'SaleID', 'SaleDate', 'TrType', 1),
( 1, 'Pur', 'I_TR_Purchases', 'PurchaseID', 'PurDate', 'TrType', 1);


go


 


INSERT INTO Z_G_Lnk_Build_DetailJournal ( 
    CompCode,
    KeyTrans,
    DescA_FelidLnk,
    IsOutFelidTable,
    NameFelidForeignKeyInTable_Lnk,
    NameOutTableGetData,
    NamePrimaryKeyOutTable,
    NameFelidAcc,
    NameFelidAmount_InTableLnk,
    IsCredit,
    NameFelidRemarks,
    IsActive
)
VALUES
(1, 'Inv', N'الصندوق', 0, NULL, NULL, NULL, 'VoucherNo', 'NetAmount', 1, 'Remarks', 1),
(1, 'Inv', N'العميل', 1, 'CustomerID', 'A_Rec_D_Customer', 'CustomerID', 'AccountNo', 'NetAmount', 0, 'Remarks', 1),
(1, 'Inv', N'الضريبه', 0, NULL, NULL, NULL, 'VoucherNo', 'VatAmount', 1, 'Remarks', 1),
(1, 'Inv', N'حساب الضريبه المضافه', 1, 'VatTypeID', 'D_A_VatType', 'VatTypeID', 'Type', 'VatAmount', 0, 'Remarks', 1),
(1, 'Inv', N'تجربة الاكسبراشن', 1, 'VatTypeID', 'D_A_VatType', 'VatTypeID', 'Type', '( ISNULL(NetAmount , 0) + ISNULL(VatAmount , 0))', 1, '''تجربه '' + Remarks', 0),
(1, 'Pur', N'الصندوق', 0, NULL, NULL, NULL, 'VoucherNo', 'NetAmount', 1, 'Remarks', 1),
(1, 'Pur', N'العميل', 1, 'SupplierID', 'D_A_Suppliers', 'SupplierID', 'SuppliersCode', 'NetAmount', 0, 'Remarks', 1),
(1, 'Pur', N'الضريبه', 0, NULL, NULL, NULL, 'VoucherNo', 'VatAmount', 1, 'Remarks', 1),
(1, 'Pur', N'حساب الضريبه المضافه', 1, 'VatTypeID', 'D_A_VatType', 'VatTypeID', 'Type', 'VatAmount', 0, 'Remarks', 1);

go


 