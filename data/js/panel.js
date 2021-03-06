(function() {
    $(function() {
        // Use this flag as a lock while updating panel config, since 
        // bootstrap-toggle switches misfire when updating
        var receivedConfig = false;
        self.port.on("tab_config", function(config) {
            receivedConfig = false;

            $("#toggle_owl").bootstrapToggle((config.mode ? "on" : "off"));
            $("#disable_here").bootstrapToggle((config.alwaysDisable ? "on" : "off"));
            $("#use_classic").bootstrapToggle(((config.classic || config.alwaysClassic) ? "on" : "off"));
            $("#always_enable_here").bootstrapToggle((config.alwaysEnable ? "on" : "off"));
            
            if (config.alwaysDisable || config.alwaysClassic || !config.mode) {
                $("#use_classic").bootstrapToggle("disable");
                $("#use_classic_text").css("color", "#6E6E6E");
            } else {
                $("#use_classic").bootstrapToggle("enable");
                $("#use_classic_text").css("color", "#333");
            }
            if (config.alwaysEnable || !config.mode) {
                $("#disable_here").bootstrapToggle("disable");
                $("#disable_here_text").css("color", "#6E6E6E");
            } else {
                $("#disable_here").bootstrapToggle("enable");
                $("#disable_here_text").css("color", "#333");
            }
            if (config.alwaysDisable) {
                $("#always_enable_here").bootstrapToggle("disable");
                $("#always_enable_text").css("color", "#6E6E6E");
            } else {
                $("#always_enable_here").bootstrapToggle("enable");
                $("#always_enable_text").css("color", "#333");
            }
            receivedConfig = true;
        });

        /* Toggle Switch for Owl */
        $("#toggle_owl").change(function() {
            if (receivedConfig) {
                var checked = $(this).prop('checked');
                self.port.emit("toggle_owl", {
                    value: checked
                });
                var status = (checked ? "enable" : "disable");
                $('#use_classic').bootstrapToggle(status);
                $('#disable_here').bootstrapToggle(status);

                $("#use_classic_text").css("color", (checked ? "#333" : "#6E6E6E"));
                $("#disable_here_text").css("color", (checked ? "#333" : "#6E6E6E"));
                $("#always_enable_text").css("color", (checked ? "#333" : "#6E6E6E"));
            }
        });

        /* Message add-on to mark this website as Classic */
        $("#use_classic").change(function() {
            if (receivedConfig)
                self.port.emit("use_classic_theme", {
                    value: $(this).prop('checked')
                });
        });

        /* Message add-on to always Disable on this website */
        $("#disable_here").change(function() {
            if (receivedConfig) {
                var checked = $(this).prop('checked');
                self.port.emit("disable_website", {
                    value: checked
                });
                $('#use_classic').bootstrapToggle(((checked && !$("#toggle_owl").prop("checked")) ? "disable" : "enable"));
                $('#always_enable_here').bootstrapToggle((checked ? "disable" : "enable"));
                $("#use_classic_text").css("color", ((checked && $("#toggle_owl").prop("checked")) ? "#6E6E6E" : "#333"));
                $("#always_enable_text").css("color", ((checked && $("#toggle_owl").prop("checked")) ? "#6E6E6E" : "#333"));
            }
        });

        /* Message add-on to always Enable on this website */
        $("#always_enable_here").change(function() {
            if (receivedConfig) {
                var checked = $(this).prop('checked');
                self.port.emit("always_enable_website", {
                    value: checked
                });
                $('#disable_here').bootstrapToggle((checked ? "disable" : "enable"));
                $("#disable_here_text").css("color", (checked ? "#6E6E6E" : "#333"));
            }
        });

    });
}());
