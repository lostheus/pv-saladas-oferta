document.addEventListener('DOMContentLoaded', () => {
    
    // ==========================================
    // 1. Intersection Observer (Fade up + Stagger)
    // ==========================================
    const observerOptions = {
      root: null,
      rootMargin: '0px 0px -100px 0px', // Aciona antes de chegar totalmente
      threshold: 0.1
    };
  
    const fadeObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          
          // Pra otimização, se já animou a gente pode parar de observar
          if (!entry.target.classList.contains('repeat-anim')) {
             observer.unobserve(entry.target);
          }
        }
      });
    }, observerOptions);
  
    // Observar elementos individuais
    document.querySelectorAll('.fade-up, .stagger-container').forEach(el => {
      fadeObserver.observe(el);
    });
  
    // ==========================================
    // 2. Countdown Timer
    // ==========================================
    const timerEls = {
      h: document.getElementById('timer-h'),
      m: document.getElementById('timer-m'),
      s: document.getElementById('timer-s')
    };
  
    if (timerEls.h && timerEls.m && timerEls.s) {
      // Começaremos faltando 5 horas, 24 minutos e 15 segundos para gerar urgência forte
      let timeRemaining = (5 * 3600) + (24 * 60) + 15;
  
      const updateTimer = () => {
        if (timeRemaining <= 0) {
            // Se chegar em 0, reseta para 2h para ter perpetuidade (opcional)
            timeRemaining = 2 * 3600;
        }
        
        const h = Math.floor(timeRemaining / 3600);
        const m = Math.floor((timeRemaining % 3600) / 60);
        const s = timeRemaining % 60;
  
        timerEls.h.textContent = h.toString().padStart(2, '0');
        timerEls.m.textContent = m.toString().padStart(2, '0');
        timerEls.s.textContent = s.toString().padStart(2, '0');
  
        timeRemaining--;
      };
      
      setInterval(updateTimer, 1000);
      updateTimer();
    }
  
    // ==========================================
    // 3. FAQ Accordion Logic
    // ==========================================
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
      const question = item.querySelector('.faq-question');
      question.addEventListener('click', () => {
        const isActive = item.classList.contains('active');
        
        // Opcional: fechar as outras perguntas abertas
        faqItems.forEach(i => i.classList.remove('active'));
        
        if (!isActive) {
          item.classList.add('active');
        }
      });
    });
  
    // ==========================================
    // 4. Sticky Mobile Navbar scroll detector (REMOVIDO A PEDIDO)
    // ==========================================
  
    // ==========================================
    // 5. Facebook Pixel Event Simulation
    // ==========================================
    // Injeta FBQ só para simular se a página for rodar sem o head real do Pixel injetado
    if(typeof fbq === 'undefined') {
        window.fbq = function() {
            console.log('FB Pixel Simulado:', arguments);
        }
    }
    
    // Ao rolar mais de 50%, envia ViewContent -> Faremos uma leitura básica
    let viewedContentTracked = false;
    window.addEventListener('scroll', () => {
        if(!viewedContentTracked) {
          const scrollPercent = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
          if(scrollPercent > 50) {
             fbq('track', 'ViewContent', { content_name: 'Saladas no Pote' });
             viewedContentTracked = true;
          }
        }
    });
  
    // Cliques de compra
    const ctas = document.querySelectorAll('.cta-btn');
    ctas.forEach(cta => {
        cta.addEventListener('click', (e) => {
            fbq('track', 'InitiateCheckout', { 
                value: 29.90, 
                currency: 'BRL',
                content_name: 'Saladas no Pote + Molhos Irresistíveis'
            });
            // Não damos .preventDefault() aqui para ele realmente navegar pro link do checkout
            // e = e; 
        });
    });
    
  });
