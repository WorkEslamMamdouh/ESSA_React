  
 -- G_Create_DirectJournal 1,'Inv',157
alter PROCEDURE [dbo].[G_Create_DirectJournal]
	@CompCode int, 
	@KeyTrans nvarchar(200),
	@TranID int 
AS
BEGIN


   SET NOCOUNT ON; 

	Declare  @SqlJournal nvarchar(4000)  , @sql nvarchar(4000)  , @sqlOutTable nvarchar(4000)  , @SqlOutTableSelectACC_CODE nvarchar(4000)  ,  @Ser INT = 1  , @Debit NVARCHAR(200) , @Credit NVARCHAR(200);
	DECLARE  @NameTableMaster nvarchar(200) , @NameFelidMasterID nvarchar(200)
	DECLARE @ID_Build INT,@DescA_FelidLnk NVARCHAR(200),@NameFelidRemarks NVARCHAR(200), @IsOutFelidTable BIT,@NameFelidForeignKeyInTable_Lnk NVARCHAR(200),@NameOutTableGetData NVARCHAR(200),@NamePrimaryKeyOutTable NVARCHAR(200),@NameFelidAcc NVARCHAR(200),@NameFelidAmount_InTableLnk NVARCHAR(200),@IsCredit BIT,@IsActive BIT;
	 
	 
		Select @NameTableMaster = NameTableMaster  ,@NameFelidMasterID = NameFelidMasterID from G_Lnk_Create_DirectJournal where  KeyTrans = @KeyTrans and  CompCode = @CompCode and IsActive = 1 


		

		--set @SQl = ' Select * from ' +   (@NameTableMaster) + ' where ' +   (@NameFelidMasterID)  + ' = ' +    str(@TranID)  
		--print @SQl
		--exec (@SQL) 




		 --***********************************-- تعريف الكيرسور********************************************


		
		DECLARE detail_cursor CURSOR FOR
		SELECT [ID_Build],[DescA_FelidLnk],[NameFelidRemarks],[IsOutFelidTable],[NameFelidForeignKeyInTable_Lnk],[NameOutTableGetData],[NamePrimaryKeyOutTable],[NameFelidAcc],[NameFelidAmount_InTableLnk],[IsCredit],[IsActive]
		FROM [dbo].[G_Lnk_Build_DetailJournal]
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





--SELECT exec(dbo.FN_Build_DirectJournalSQL(1, 'Inv', 157)) AS GeneratedSQL;

Alter FUNCTION dbo.FN_Build_DirectJournalSQL
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
    FROM G_Lnk_Create_DirectJournal 
    WHERE KeyTrans = @KeyTrans AND CompCode = @CompCode AND IsActive = 1

    -- Cursor Simulation using WHILE
    DECLARE cur CURSOR FOR
    SELECT [ID_Build],[DescA_FelidLnk],[NameFelidRemarks],[IsOutFelidTable],
           [NameFelidForeignKeyInTable_Lnk],[NameOutTableGetData],[NamePrimaryKeyOutTable],
           [NameFelidAcc],[NameFelidAmount_InTableLnk],[IsCredit],[IsActive]
    FROM [dbo].[G_Lnk_Build_DetailJournal]
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
            SET @Credit = @NameFelidAmount_InTableLnk
            SET @Debit = '0.00'
        END
        ELSE
        BEGIN
            SET @Credit = '0.00'
            SET @Debit = @NameFelidAmount_InTableLnk
        END

        -- SQL Generation
        IF @IsOutFelidTable = 0
        BEGIN
            SET @SQL = 'SELECT ' + CAST(@Ser AS NVARCHAR) + ' AS Ser, N''' + @DescA_FelidLnk + ''' AS DescATrans, ' + 
                        CAST(@CompCode AS NVARCHAR) + ' AS CompCode, ' + @NameFelidAcc + ' AS ACC_CODE, ' +
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
                        CAST(@CompCode AS NVARCHAR) + ' AS CompCode, (' + @sqlOutTable + ') AS ACC_CODE, ' +
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


Go



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
alter PROCEDURE dbo.GenerateDirectJournal
    @CompCode INT,
    @KeyTrans NVARCHAR(200),
    @TranID INT
AS
BEGIN

SET NOCOUNT ON; 

    DECLARE @SqlToExecute NVARCHAR(MAX) = 'INSERT INTO JournalResult '
	DECLARE @Sql NVARCHAR(MAX)

	--------------------------------------------------

    SET @Sql = dbo.FN_Build_DirectJournalSQL(@CompCode, @KeyTrans, @TranID)
	 
    set @SqlToExecute = @SqlToExecute + CHAR(13) + CHAR(10) + @Sql;
    
   -- PRINT @SqlToExecute  -- يساعدك تشوف لو فيه غلط في بناء النص

	Delete JournalResult where TranID = @TranID

    -- نفذ النص
    EXEC(@SqlToExecute)
END


Go


DECLARE @CompCode INT, @SaleID INT

DECLARE SalesCursor CURSOR FOR
SELECT CompCode, SaleID FROM [dbo].[I_TR_Sales]

OPEN SalesCursor

FETCH NEXT FROM SalesCursor INTO @CompCode, @SaleID

WHILE @@FETCH_STATUS = 0
BEGIN
    

  exec GenerateDirectJournal @CompCode,'Inv',@SaleID

    FETCH NEXT FROM SalesCursor INTO @CompCode, @SaleID
END

CLOSE SalesCursor
DEALLOCATE SalesCursor


Go

