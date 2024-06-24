import { isInvalidProduct } from "../utils/index.js";

export const getProducts = async (req, res) => {
  try {
    // Connect
    req.getConnection((err, conn) => {
      if (err)
        return res.status(500).json({ status: 'Error', error: err.message });

      // Search all
      conn.query('SELECT * FROM products', (err, products) => {
        if (err)
          return res.status(500).json({ status: 'Error', error: err.message });

        if (products.length === 0)
          return res.status(404).json({ status: 'Error', error: 'Products not found' });

        // Send products
        return res.status(200).json({ status: 'Success', products });
      });
    });
  } catch (err) {
    return res.status(500).json({ status: 'Error', error: err.message });
  }
};

export const getProduct = async (req, res) => {
  try {
    const { id } = req.params;

    // Connect
    req.getConnection((err, conn) => {
      if (err)
        return res.status(500).json({ status: 'Error', error: err.message });

      // Search by ID
      conn.query(
        'SELECT * FROM products WHERE products.product_id = ?',
        [id],
        (err, product) => {
          if (err)
            return res.status(500).json({ status: 'Error', error: err.message });

          if (product.length === 0)
            return res.status(404).json({ status: 'Error', error: 'Product not found' });

          // Send product
          return res.status(200).json({ status: 'Success', product });
        },
      );
    });
  } catch (err) {
    return res.status(500).json({ status: 'Error', error: err.message });
  }
};

export const createProduct = async (req, res) => {
  try {
    // Get and validate data
    const product = req.body;
    if (isInvalidProduct(product))
      return res.status(400).json({ status: 'Error', error: 'Incorrect data submitted' });

    // Connect
    req.getConnection((err, conn) => {
      if (err)
        return res.status(500).json({ status: 'Error', error: err.message });

      // Create product
      conn.query('INSERT INTO products SET ?', [product], (err, result) => {
        if (err)
          return res.status(500).json({ status: 'Error', error: err.message });

        return res.status(200).json({ status: 'Success', message: 'Create successful', product_id: result.insertId });
      });

    });
  } catch (err) {
    return res.status(500).json({ status: 'Error', error: err.message });
  }
};

export const updateProduct = async (req, res) => {
  try {
    // Get and validate data
    const { id } = req.params;
    const product = req.body;
    if (isInvalidProduct(product))
      return res.status(400).json({ status: 'Error', error: 'Incorrect data submitted' });

    // Connect
    req.getConnection((err, conn) => {
      if (err)
        return res.status(500).json({ status: 'Error', error: err.message });

      // Search by ID
      conn.query(
        'SELECT * FROM products WHERE products.product_id = ?',
        [id],
        async (err, user) => {
          if (err)
            return res.status(500).json({ status: 'Error', error: err.message });
          
					if (user.length === 0)
            return res.status(404).json({ status: 'Error', error: 'Product not found' });

          // Update product
          conn.query(
            'UPDATE products SET ? WHERE products.product_id = ?',
            [product, id],
            (err, result) => {
              if (err)
                return res.status(500).json({ status: 'Error', error: err.message });

              // Response
              return res.status(200).json({ status: 'Success', message: 'Update successful' });
            },
          );
        },
      );
    });
  } catch (err) {
    return res.status(500).json({ status: 'Error', error: err.message });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    // Connect
    req.getConnection((err, conn) => {
      if (err)
        return res.status(500).json({ status: 'Error', error: err.message });

      // Search by ID
      conn.query(
        'SELECT * FROM products WHERE products.product_id = ?',
        [id],
        async (err, product) => {
          if (err)
            return res.status(500).json({ status: 'Error', error: err.message });
					
					if (product.length === 0)
            return res.status(404).json({ status: 'Error', error: 'Product not found' });

          // Delete product
          conn.query(
						'DELETE FROM products WHERE products.product_id = ?',
						[id],
						(err, results) => {
              if (err)
                return res.status(500).json({ status: 'Error', error: err.message });

              // Response
              return res.status(200).json({ status: 'Success', message: 'Delete successful' });
            },
          );
        },
      );
    });
  } catch (err) {
    return res.status(500).json({ status: 'Error', error: err.message });
  }
};
