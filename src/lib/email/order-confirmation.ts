import { Resend } from 'resend';
import { Order } from '@/types';

const resend = new Resend(process.env.RESEND_API_KEY);

function escapeHtml(value: unknown): string {
  return String(value ?? '').replace(/[&<>"']/g, (character) => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
  })[character]!);
}

function imageUrl(src: string): string {
  if (/^https:\/\//i.test(src)) return escapeHtml(src);
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL;
  return escapeHtml(baseUrl ? new URL(src, baseUrl).toString() : '');
}

export async function sendOrderConfirmationEmail(order: Order, email: string) {
  const itemsHtml = (order.items || [])
    .map(
      (item) => `
      <tr>
        <td style="padding:12px;border-bottom:1px solid #f0f0f0;">
          <img src="${imageUrl(item.product_image)}" width="60" style="border-radius:8px;vertical-align:middle;margin-right:12px;" />
          ${escapeHtml(item.product_name)}
        </td>
        <td style="padding:12px;border-bottom:1px solid #f0f0f0;text-align:center;">${item.quantity}</td>
        <td style="padding:12px;border-bottom:1px solid #f0f0f0;text-align:right;">₹${(item.price * item.quantity).toFixed(2)}</td>
      </tr>`
    )
    .join('');

  const html = `
  <!DOCTYPE html>
  <html>
  <head><meta charset="utf-8" /></head>
  <body style="margin:0;padding:0;background:#f4f4f4;font-family:Arial,sans-serif;">
    <table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f4f4;padding:40px 0;">
      <tr><td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background:#fff;border-radius:12px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.08);">
          
          <!-- Header -->
          <tr><td style="background:#111;padding:32px 40px;text-align:center;">
            <h1 style="color:#fff;margin:0;font-size:28px;letter-spacing:2px;">LIZZ SHOP</h1>
            <p style="color:#aaa;margin:8px 0 0;font-size:14px;">Order Confirmation</p>
          </td></tr>

          <!-- Body -->
          <tr><td style="padding:40px;">
            <h2 style="color:#111;margin:0 0 8px;">Thank you for your order! 🎉</h2>
            <p style="color:#555;margin:0 0 24px;">Your order has been placed successfully. Here's your receipt:</p>

            <table width="100%" cellpadding="0" cellspacing="0" style="background:#f9f9f9;border-radius:8px;padding:16px;margin-bottom:24px;">
              <tr>
                <td style="color:#888;font-size:13px;">Order ID</td>
                <td style="color:#111;font-weight:bold;text-align:right;font-size:13px;">#${escapeHtml(order.id.slice(0, 8).toUpperCase())}</td>
              </tr>
              <tr>
                <td style="color:#888;font-size:13px;padding-top:8px;">Date</td>
                <td style="color:#111;text-align:right;font-size:13px;padding-top:8px;">${new Date(order.created_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}</td>
              </tr>
              <tr>
                <td style="color:#888;font-size:13px;padding-top:8px;">Status</td>
                <td style="text-align:right;padding-top:8px;"><span style="background:#d1fae5;color:#065f46;padding:2px 10px;border-radius:20px;font-size:12px;font-weight:bold;">CONFIRMED</span></td>
              </tr>
            </table>

            <!-- Items -->
            <h3 style="color:#111;margin:0 0 12px;font-size:16px;">Order Items</h3>
            <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:24px;">
              <thead>
                <tr style="background:#f0f0f0;">
                  <th style="padding:10px 12px;text-align:left;font-size:13px;color:#555;">Product</th>
                  <th style="padding:10px 12px;text-align:center;font-size:13px;color:#555;">Qty</th>
                  <th style="padding:10px 12px;text-align:right;font-size:13px;color:#555;">Price</th>
                </tr>
              </thead>
              <tbody>${itemsHtml}</tbody>
            </table>

            <!-- Totals -->
            <table width="100%" cellpadding="0" cellspacing="0" style="border-top:2px solid #f0f0f0;padding-top:16px;">
              <tr>
                <td style="color:#888;padding:4px 0;font-size:14px;">Subtotal</td>
                <td style="text-align:right;color:#111;font-size:14px;">₹${order.subtotal.toFixed(2)}</td>
              </tr>
              <tr>
                <td style="color:#888;padding:4px 0;font-size:14px;">Shipping</td>
                <td style="text-align:right;color:#111;font-size:14px;">₹${order.shipping_cost.toFixed(2)}</td>
              </tr>
              <tr>
                <td style="color:#888;padding:4px 0;font-size:14px;">Tax (10%)</td>
                <td style="text-align:right;color:#111;font-size:14px;">₹${order.tax.toFixed(2)}</td>
              </tr>
              <tr>
                <td style="color:#111;font-weight:bold;font-size:18px;padding-top:12px;">Total</td>
                <td style="text-align:right;color:#111;font-weight:bold;font-size:18px;padding-top:12px;">₹${order.total.toFixed(2)}</td>
              </tr>
            </table>

            <!-- Shipping Address -->
            <div style="background:#f9f9f9;border-radius:8px;padding:16px;margin-top:24px;">
              <h3 style="color:#111;margin:0 0 8px;font-size:14px;">Shipping To</h3>
              <p style="color:#555;margin:0;font-size:14px;line-height:1.6;">
                ${escapeHtml(order.shipping_address.full_name)}<br/>
                ${escapeHtml(order.shipping_address.address)}<br/>
                ${escapeHtml(order.shipping_address.city)}, ${escapeHtml(order.shipping_address.state)} - ${escapeHtml(order.shipping_address.zip)}<br/>
                ${escapeHtml(order.shipping_address.country)}
              </p>
            </div>

            <div style="text-align:center;margin-top:32px;">
              <a href="${process.env.NEXT_PUBLIC_APP_URL}/orders" style="background:#111;color:#fff;padding:14px 32px;border-radius:8px;text-decoration:none;font-weight:bold;font-size:15px;">View My Orders</a>
            </div>
          </td></tr>

          <!-- Footer -->
          <tr><td style="background:#f9f9f9;padding:24px 40px;text-align:center;border-top:1px solid #eee;">
            <p style="color:#aaa;font-size:12px;margin:0;">© ${new Date().getFullYear()} Lizz Shop. All rights reserved.</p>
            <p style="color:#aaa;font-size:12px;margin:4px 0 0;">If you have questions, reply to this email.</p>
          </td></tr>

        </table>
      </td></tr>
    </table>
  </body>
  </html>`;

  return resend.emails.send({
    from: process.env.RESEND_FROM_EMAIL!,
    to: email,
    subject: `Order Confirmed #${order.id.slice(0, 8).toUpperCase()} — Lizz Shop`,
    html,
  });
}
