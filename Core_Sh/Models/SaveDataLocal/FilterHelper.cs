using System;
using System.Collections.Generic;
using System.Linq;

public class FilterHelper
{
    public static List<object> ApplyConditionToList(IEnumerable<object> dataList, string condition)
    {
        var filteredList = new List<object>();

        foreach (var item in dataList)
        {
            bool matchesCondition = EvaluateCondition(item, condition);

            if (matchesCondition)
            {
                filteredList.Add(item);
            }
        }

        return filteredList;
    }

    private static bool  EvaluateCondition(object item, string condition)
    {
        try
        {
            var formattedCondition = condition
                .Replace("&&", " and ")
                .Replace("||", " or ");

            // بناء تعبير ديناميكي باستخدام LINQ Expression
            var lambdaCondition = $"{formattedCondition}";

            //var parameterName = "x";
            //var lambda = System.Linq.Dynamic.Core.DynamicExpressionParser.ParseLambda(
            //    new[] { System.Linq.Expressions.Expression.Parameter(item.GetType(), parameterName) },
            //    typeof(bool),
            //    lambdaCondition
            //);

            //// تنفيذ الشرط
            //return (bool)lambda.Compile().DynamicInvoke(item);

            return false;
        }
        catch (Exception ex)
        {
            Console.WriteLine($"Error parsing condition: {ex.Message}");
            return false;
        }
    }
}
