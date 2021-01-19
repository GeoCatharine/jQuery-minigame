

$(function(){

    var box             = $('.cube'),
        wrapper         = $('.game'),
        up              = $('.up'),
        down            = $('.down'),
        left            = $('.left'),
        right           = $('.right'),
        hp              = $('.hpbar'),
        style           = { position: 'relative' },
        hurt            = { width: '' },
        wrapperWidth    = wrapper.width(),
        wrapperHeight   = wrapper.height(),
        boxWidth        = box.width(),
        boxHeight       = box.height();
    
    box
        .css(style);


    var initialTop = box.position().top;
    var initialLeft = box.position().left;
    var animating = false;
    var healthBar = $('.hpbar');
    var health = 100;

    $('.hpbar p').text(health);

    function damage(health, healthBar) {
        var tempHealth = 0;
        var hpBar = $('.hpbar p');
        tempHealth = health - 20;

        if (tempHealth < 0) {
            tempHealth = 0;
        }

        healthBar.css('width', tempHealth + '%');
        hpBar.text(tempHealth);

        if (tempHealth === 0) {
            hpBar.text(tempHealth);
            setTimeout(function() {
                alert('You failed sucker');
                tempHealth = 100;
                hpBar.text(tempHealth);
                healthBar.css('width', tempHealth + '%');
            }, 1);
            hp.css({backgroundColor: '#6baa65'});
        } else if (tempHealth <= 30) {
            hp.css({backgroundColor: '#ff8585'});
        } else if (tempHealth <= 60) {
            hp.css({backgroundColor: '#f8dc81' });
        }

        return { health: tempHealth, healthBar };
    }

    function wall(box, wrapper, position) {
        if (position === 'top') {
            if (box.position().top < wrapper.position().top) {
                box.animate({top: 0, left: 0})
                health = damage(health, healthBar).health;
            }
        } else if (position === 'left') {
            if (box.position().left < wrapper.position().left) {
                box.animate({top: 0, left: 0})
                health = damage(health, healthBar).health;
            }
        } else if (position === 'down') {
            if (box.position().top > wrapper.position().top + wrapper.height() - box.height() ) {
                box.animate({top: 0, left: 0})
                health = damage(health, healthBar).health;
            }
        } else if (position === 'right') {
            if (box.position().left > wrapper.position().left + wrapper.width() - box.width()) {
                box.animate({top:0, left:0})
                health = damage(health, healthBar).health;
            }
        }
    }

    up
        .click(function() {
            if (animating === false) {
                box.animate({top: box.position().top - initialTop - 100}, {
                    start: function() {
                        animating = true;
                    },
                    complete: function() {
                        animating = false;
                        wall(box, wrapper, 'top'); 
                    }
                });
            }
        });


    down
        .click(function() {
            if (animating === false) {
                box.animate({top: box.position().top - initialTop + 100}, {
                    start: function() {
                        animating = true;
                    },
                    complete: function() {
                        animating = false;
                        wall(box, wrapper, 'down');
                        console.log(box.position());
                    }
                });
            }  
        });

    left
        .click(function() {
            if (animating === false) {
                box.animate({left: box.position().left - initialLeft - 100}, {
                    start: function() {
                        animating = true;
                    },
                    complete: function() {
                        animating = false;
                        wall(box, wrapper, 'left');
                    }
                });
            }
        });

    right
        .click(function() {
            if (animating === false) {
                box.animate({left: box.position().left - initialLeft + 100}, {
                    start: function() {
                        animating = true;
                    },
                    complete: function() {
                        animating = false;
                        wall(box, wrapper, 'right');
                    }
                });
            }
        });
});
