<?php

/**
 * Admin Hooks
*/

function tiankii_message_on_plugin_activate() {
	// Set a transient that expires after a little while (e.g., 60 seconds)
	set_transient( 'tiankii_admin_notices', true, 60 );
}

function tiankii_admin_notices() {
	// Check if our transient is set, and display the error message
	$adminUrl = admin_url( 'admin.php?page=wc-settings&tab=checkout&section=tiankii' );
	if ( get_transient( 'tiankii_admin_notices' ) ) {
		?>
			<div class='notice notice-success is-dismissible'>
				<p>
					Nice! You can now accept payments using Tiankii. Finish your setup on
					<a href='<?php echo esc_url( $adminUrl ); ?>'>this page.</a>
				</p>
			</div>
		<?php
		// Don't forget to delete the transient so we don't keep displaying the message
		delete_transient( 'tiankii_admin_notices' );
	}
}