using System;
using System.Collections.Generic;

namespace Onboardingtask.Models
{
    public partial class Product
    {
        public Product()
        {
            Sales = new HashSet<Sales>();
        }

        public int ProductId { get; set; }
        public string Name { get; set; }
        public int Price { get; set; }

        public virtual ICollection<Sales> Sales { get; set; }
    }
}
