export default {
  methods: {
    getCollectionRules({ ruleSet }) {
      const rules = this.normaliseCollectionRules(ruleSet);
      const disjuntive = ruleSet.appliedDisjunctively;
      const numericOperators = ["<", ">"];
      const hideFilters = [];
      const numericFilters = {};
      const disjunctivefacetFilters = {};
      const facetFilters = {};

      for (let iteration = 0; iteration < rules.length; iteration++) {
        hideFilters.push(rules[iteration].column);

        if (numericOperators.includes(rules[iteration].relation)) {
          numericFilters[rules[iteration].column] = [
            ...(numericFilters[rules[iteration].column] || []),
            {
              relation: rules[iteration].relation,
              condition: rules[iteration].condition,
            },
          ];
        } else if (disjuntive) {
          disjunctivefacetFilters[rules[iteration].column] = [
            ...(disjunctivefacetFilters[rules[iteration].column] || []),
            rules[iteration].condition,
          ];
        } else {
          facetFilters[rules[iteration].column] = [
            ...(facetFilters[rules[iteration].column] || []),
            rules[iteration].condition,
          ];
        }
      }

      return {
        facetFilters,
        disjunctivefacetFilters,
        numericFilters,
      };
    },
    normaliseCollectionRules({ rules }) {
      rules = rules.map(rule => ({
        ...rule,
        column: rule.column.toLowerCase(),
      }));

      const numericOperators = ["greater_than", "less_than"];
      for (let iteration = 0; iteration < rules.length; iteration++) {
        rules[iteration].column = this.resolveRealFacetName(
          rules[iteration].column
        );

        if (numericOperators.includes(rules[iteration].relation)) {
          rules[iteration].relation = this.resolveRealMathOperator(
            rules[iteration].relation
          );
        }

        if (
          rules[iteration].column === "tags" &&
          rules[iteration].condition.includes(":")
        ) {
          const customTagCondition = rules[iteration].condition.split(":");

          if (customTagCondition[0] === "size") {
            customTagCondition[0] = "options.size";
          } else {
            customTagCondition[0] = "named_tags." + customTagCondition[0];
          }

          rules[iteration].column = customTagCondition[0];
          rules[iteration].condition = customTagCondition[1];
        }
      }
      return rules;
    },
    resolveRealFacetName(facet) {
      switch (facet) {
        case "variant_inventory":
          return "inventory_quantity";
        case "variant_price":
          return "price";
        case "tag":
          return "tags";
        default:
          return facet;
      }
    },
    resolveRealMathOperator(operator) {
      switch (operator) {
        case "greater_than":
          return ">";
        case "less_than":
          return "<";
        default:
          return operator;
      }
    },
  },
};
