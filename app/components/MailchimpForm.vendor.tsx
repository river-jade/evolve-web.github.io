export const MailChimpVendorForm = () => {
  return <div dangerouslySetInnerHTML={{ __html: mcMarkup }} />
}

const mcMarkup = `
<link href="https://cdn-images.mailchimp.com/embedcode/classic-061523.css" rel="stylesheet" type="text/css">
<style type="text/css">
  #mc_embed_signup{background:#fff; false;clear:left; font:14px Helvetica,Arial,sans-serif; width: 600px;}
</style>

<div id="mc_embed_shell">
  <div id="mc_embed_signup">
    <form
      action="https://facebook.us10.list-manage.com/subscribe/post?u=2f59f4888aeaef053a48ad2bc&amp;id=100146c012&amp;f_id=005857e4f0"
      method="post"
      id="mc-embedded-subscribe-form"
      name="mc-embedded-subscribe-form"
      class="validate"
      target="_blank"
    >
      <div id="mc_embed_signup_scroll">
        <h2>Subscribe</h2>
        <div class="indicates-required">
          <span class="asterisk">*</span> indicates required
        </div>
        <div class="mc-field-group">
          <label for="mce-EMAIL"
            >Email Address <span class="asterisk">*</span></label
          ><input
            type="email"
            name="EMAIL"
            class="required email"
            id="mce-EMAIL"
            required=""
            value=""
          />
        </div>
        <div id="mce-responses" class="clear foot">
          <div
            class="response"
            id="mce-error-response"
            style="display: none"
          ></div>
          <div
            class="response"
            id="mce-success-response"
            style="display: none"
          ></div>
        </div>
        <div aria-hidden="true" style="position: absolute; left: -5000px">
          /* real people should not fill this in and expect good things - do not
          remove this or risk form bot signups */
          <input
            type="text"
            name="b_2f59f4888aeaef053a48ad2bc_100146c012"
            tabindex="-1"
            value=""
          />
        </div>
        <div class="optionalParent">
          <div class="clear foot">
            <input
              type="submit"
              name="subscribe"
              id="mc-embedded-subscribe"
              class="button"
              value="Subscribe"
            />
            <p style="margin: 0px auto">
              <a
                href="http://eepurl.com/i1lShE"
                title="Mailchimp - email marketing made easy and fun"
                ><span
                  style="
                    display: inline-block;
                    background-color: transparent;
                    border-radius: 4px;
                  "
                  ><img
                    class="refferal_badge"
                    src="https://digitalasset.intuit.com/render/content/dam/intuit/mc-fe/en_us/images/intuit-mc-rewards-text-dark.svg"
                    alt="Intuit Mailchimp"
                    style="
                      width: 220px;
                      height: 40px;
                      display: flex;
                      padding: 2px 0px;
                      justify-content: center;
                      align-items: center;
                    " /></span
              ></a>
            </p>
          </div>
        </div>
      </div>
    </form>
  </div>
  <script
    type="text/javascript"
    src="//s3.amazonaws.com/downloads.mailchimp.com/js/mc-validate.js"
  ></script>
  <script type="text/javascript">
    (function ($) {
      window.fnames = new Array();
      window.ftypes = new Array();
      fnames[0] = "EMAIL";
      ftypes[0] = "email";
      fnames[1] = "FNAME";
      ftypes[1] = "text";
      fnames[2] = "LNAME";
      ftypes[2] = "text";
      fnames[3] = "MMERGE3";
      ftypes[3] = "text";
      fnames[4] = "MMERGE4";
      ftypes[4] = "text";
      fnames[5] = "MMERGE5";
      ftypes[5] = "text";
      fnames[6] = "MMERGE6";
      ftypes[6] = "text";
      fnames[7] = "MMERGE7";
      ftypes[7] = "date";
      fnames[8] = "MMERGE8";
      ftypes[8] = "date";
      fnames[9] = "MMERGE9";
      ftypes[9] = "number";
      fnames[10] = "MMERGE10";
      ftypes[10] = "number";
      fnames[11] = "MMERGE11";
      ftypes[11] = "number";
    })(jQuery);
    var $mcj = jQuery.noConflict(true);
  </script>
</div>
`
